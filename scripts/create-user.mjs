// Usage: node scripts/create-user.mjs <email> [userId]
// Prints a temporary password (as a SQL comment) and SQL that inserts the user,
// or resets the password of an existing user and signs them out everywhere.
// Apply with: npx wrangler d1 execute westscott-intake-db --remote --file <sql-file>
import { pbkdf2Sync, randomBytes, randomUUID } from 'node:crypto';

const [email, id = randomUUID()] = process.argv.slice(2);
if (!email || !email.includes('@')) {
  console.error('Usage: node scripts/create-user.mjs <email> [userId]');
  process.exit(1);
}
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
const chars = Array.from(randomBytes(12), (b) => alphabet[b % alphabet.length]);
const temp = [chars.slice(0, 4), chars.slice(4, 8), chars.slice(8, 12)].map((g) => g.join('')).join('-');
const salt = randomBytes(16);
const hash = pbkdf2Sync(temp, salt, 100000, 32, 'sha256');
const stored = `pbkdf2$100000$${salt.toString('base64')}$${hash.toString('base64')}`;
const now = new Date().toISOString();
const e = email.trim().toLowerCase().split("'").join("''");
console.log(`-- temp password for ${e}: ${temp}`);
console.log(
  `INSERT INTO users (id, email, password_hash, must_change_password, created_at, updated_at) VALUES ('${id}', '${e}', '${stored}', 1, '${now}', '${now}') ` +
    `ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, must_change_password = 1, updated_at = excluded.updated_at;`,
);
console.log(`DELETE FROM sessions WHERE user_id = (SELECT id FROM users WHERE email = '${e}');`);
