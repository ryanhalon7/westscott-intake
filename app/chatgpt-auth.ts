import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "cloudflare:workers";

// Auth is provided by Cloudflare Access. In production we verify the signed
// Cf-Access-Jwt-Assertion token (never trust plain headers). In local dev the
// starter's simulated oai-authenticated-user-* headers are still accepted.
// File keeps its original name/exports so existing imports continue to work.

export type ChatGPTUser = {
  userId: string;
  displayName: string;
  email: string;
  fullName: string | null;
};

type AccessEnv = { ACCESS_TEAM_DOMAIN?: string; ACCESS_AUD?: string };
type Jwk = JsonWebKey & { kid?: string };

let jwksCache: { at: number; keys: Jwk[] } | null = null;

async function getKeys(teamDomain: string, force = false): Promise<Jwk[]> {
  if (!force && jwksCache && Date.now() - jwksCache.at < 3_600_000) return jwksCache.keys;
  const res = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error("Unable to fetch Access certs");
  const { keys } = (await res.json()) as { keys: Jwk[] };
  jwksCache = { at: Date.now(), keys };
  return keys;
}

function b64url(s: string): Uint8Array<ArrayBuffer> {
  const b = atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "="));
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
}

async function verifyAccessJwt(token: string, teamDomain: string, aud: string) {
  const [h, p, s] = token.split(".");
  if (!h || !p || !s) return null;
  const header = JSON.parse(new TextDecoder().decode(b64url(h)));
  if (header.alg !== "RS256") return null;
  let key = (await getKeys(teamDomain)).find((k) => k.kid === header.kid);
  if (!key) key = (await getKeys(teamDomain, true)).find((k) => k.kid === header.kid);
  if (!key) return null;
  const cryptoKey = await crypto.subtle.importKey(
    "jwk", key, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"],
  );
  const ok = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5", cryptoKey, b64url(s), new TextEncoder().encode(`${h}.${p}`),
  );
  if (!ok) return null;
  const claims = JSON.parse(new TextDecoder().decode(b64url(p)));
  const auds: string[] = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!auds.includes(aud)) return null;
  if (claims.iss !== `https://${teamDomain}`) return null;
  if (typeof claims.exp !== "number" || claims.exp * 1000 < Date.now()) return null;
  return claims as { sub?: string; email?: string };
}

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const requestHeaders = await headers();
  const cfg = env as unknown as AccessEnv;

  if (cfg.ACCESS_TEAM_DOMAIN && cfg.ACCESS_AUD) {
    const token = requestHeaders.get("cf-access-jwt-assertion");
    if (!token) return null;
    try {
      const claims = await verifyAccessJwt(token, cfg.ACCESS_TEAM_DOMAIN, cfg.ACCESS_AUD);
      if (!claims?.email) return null;
      return {
        userId: claims.sub ?? claims.email,
        displayName: claims.email,
        email: claims.email,
        fullName: null,
      };
    } catch {
      return null;
    }
  }

  // Not configured: only allow the simulated dev headers outside production.
  if (process.env.NODE_ENV === "production") return null;
  const userId = requestHeaders.get("oai-authenticated-user-id");
  const email = requestHeaders.get("oai-authenticated-user-email");
  if (!userId || !email) return null;
  return { userId, displayName: email, email, fullName: null };
}

export async function requireChatGPTUser(returnTo: string): Promise<ChatGPTUser> {
  const user = await getChatGPTUser();
  if (user) return user;
  redirect(chatGPTSignInPath(returnTo));
}

export function chatGPTSignInPath(returnTo: string): string {
  // Access normally intercepts before this is reached.
  return process.env.NODE_ENV === "production"
    ? "/cdn-cgi/access/login"
    : `/signin-with-chatgpt?return_to=${encodeURIComponent(returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/")}`;
}

export function chatGPTSignOutPath(returnTo = "/"): string {
  return process.env.NODE_ENV === "production"
    ? "/cdn-cgi/access/logout"
    : `/signout-with-chatgpt?return_to=${encodeURIComponent(returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/")}`;
}
