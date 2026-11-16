import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { readCookie, userFromToken, type User } from '@/lib/auth';

export type SignedInUser = User & { userId: string };

export async function getUser(): Promise<SignedInUser | null> {
  const token = readCookie((await headers()).get('cookie'));
  const user = await userFromToken(token);
  return user ? { ...user, userId: user.id } : null;
}

/** For pages: redirects to /login, or to the password screen when a temporary password must be changed. */
export async function requireUser(returnTo: string, opts: { allowMustChange?: boolean } = {}): Promise<SignedInUser> {
  const user = await getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  if (user.mustChangePassword && !opts.allowMustChange) redirect('/account/password');
  return user;
}
