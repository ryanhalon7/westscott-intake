// Email + password auth with server-side sessions stored in D1.
// Passwords: PBKDF2-SHA256, 100k iterations (Workers' maximum), 16-byte salt.
// Sessions: random 32-byte token in an HttpOnly cookie; only its SHA-256 is stored.
import { env } from 'cloudflare:workers';

export const SESSION_COOKIE = 'ws_session';
export const SESSION_DAYS = 30;
const ITERATIONS = 100_000;
const MAX_FAILS = 5;
const LOCK_MINUTES = 15;

export type User = { id: string; email: string; mustChangePassword: boolean };

function db() {
  if (!env.DB) throw new Error('Storage is not configured.');
  return env.DB;
}
const b64 = (b: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(b)));
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const hex = (b: ArrayBuffer) => Array.from(new Uint8Array(b), (x) => x.toString(16).padStart(2, '0')).join('');

async function pbkdf2(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2$${ITERATIONS}$${b64(salt)}$${b64(await pbkdf2(password, salt, ITERATIONS))}`;
}

async function verifyPassword(password: string, stored: string) {
  const [scheme, iter, salt, hash] = stored.split('$');
  if (scheme !== 'pbkdf2' || !iter || !salt || !hash) return false;
  const actual = new Uint8Array(await pbkdf2(password, unb64(salt), Number(iter)));
  const expected = unb64(hash);
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
  return diff === 0;
}

const tokenHash = async (token: string) => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token)));

export function passwordProblem(password: string) {
  if (password.length < 10) return 'Use at least 10 characters.';
  if (password.length > 200) return 'That password is too long.';
  return null;
}

export type LoginResult = { ok: true; token: string; user: User } | { ok: false; error: string };

export async function login(emailRaw: string, password: string): Promise<LoginResult> {
  const email = emailRaw.trim().toLowerCase();
  const now = Date.now();
  if (!email || !password) return { ok: false, error: 'Enter your email and password.' };
  const fails = await db()
    .prepare('SELECT count(*) n FROM login_attempts WHERE email = ? AND ok = 0 AND at > ?')
    .bind(email, now - LOCK_MINUTES * 60_000)
    .first<{ n: number }>();
  if ((fails?.n ?? 0) >= MAX_FAILS) return { ok: false, error: `Too many attempts. Try again in ${LOCK_MINUTES} minutes.` };

  const row = await db()
    .prepare('SELECT id, email, password_hash, must_change_password FROM users WHERE email = ?')
    .bind(email)
    .first<{ id: string; email: string; password_hash: string; must_change_password: number }>();
  // Always run a hash so response time does not reveal whether the email exists.
  const valid = row ? await verifyPassword(password, row.password_hash) : (await hashPassword(password), false);
  await db().prepare('INSERT INTO login_attempts (email, at, ok) VALUES (?, ?, ?)').bind(email, now, valid ? 1 : 0).run();
  if (!row || !valid) return { ok: false, error: 'That email and password don’t match.' };

  const token = b64(crypto.getRandomValues(new Uint8Array(32))).replace(/[+/=]/g, (c) => ({ '+': '-', '/': '_', '=': '' })[c]!);
  await db()
    .prepare('INSERT INTO sessions (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)')
    .bind(await tokenHash(token), row.id, now + SESSION_DAYS * 86_400_000, now)
    .run();
  await db().prepare('DELETE FROM login_attempts WHERE at < ?').bind(now - 86_400_000).run();
  return { ok: true, token, user: { id: row.id, email: row.email, mustChangePassword: !!row.must_change_password } };
}

export async function userFromToken(token: string | undefined): Promise<User | null> {
  if (!token) return null;
  const row = await db()
    .prepare(
      'SELECT u.id, u.email, u.must_change_password FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?',
    )
    .bind(await tokenHash(token), Date.now())
    .first<{ id: string; email: string; must_change_password: number }>();
  return row ? { id: row.id, email: row.email, mustChangePassword: !!row.must_change_password } : null;
}

export async function logout(token: string | undefined) {
  if (token) await db().prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await tokenHash(token)).run();
}

export async function changePassword(user: User, current: string, next: string, keepToken: string) {
  const row = await db().prepare('SELECT password_hash FROM users WHERE id = ?').bind(user.id).first<{ password_hash: string }>();
  if (!row || !(await verifyPassword(current, row.password_hash))) return 'Your current password is wrong.';
  const problem = passwordProblem(next);
  if (problem) return problem;
  if (next === current) return 'Choose a new password, not your current one.';
  await db()
    .prepare('UPDATE users SET password_hash = ?, must_change_password = 0, updated_at = ? WHERE id = ?')
    .bind(await hashPassword(next), new Date().toISOString(), user.id)
    .run();
  // Sign out every other device.
  await db().prepare('DELETE FROM sessions WHERE user_id = ? AND token_hash != ?').bind(user.id, await tokenHash(keepToken)).run();
  return null;
}

export function readCookie(cookieHeader: string | null, name = SESSION_COOKIE) {
  for (const part of (cookieHeader ?? '').split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return undefined;
}

export function sessionCookie(token: string, secure: boolean) {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}${secure ? '; Secure' : ''}`;
}
export function clearCookie(secure: boolean) {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? '; Secure' : ''}`;
}

export function safeNext(value: string | null | undefined) {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return '/';
  if (value.startsWith('/login') || value.startsWith('/api/')) return '/';
  return value;
}

