import { changePassword, readCookie, userFromToken } from '@/lib/auth';

export async function POST(request: Request) {
  const url = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return new Response('Forbidden', { status: 403 });
  const token = readCookie(request.headers.get('cookie'));
  const user = await userFromToken(token);
  if (!user || !token) return Response.redirect(new URL('/login', url).toString(), 303);
  const fd = await request.formData();
  const form = { get: (n: string) => String(fd.get(n) ?? '') };
  const current = form.get('current');
  const fresh = form.get('password');
  const error =
    fresh !== form.get('confirm') ? 'The new passwords don’t match.' : await changePassword(user, current, fresh, token);
  if (error) {
    const back = new URL('/account/password', url);
    back.searchParams.set('error', error);
    return Response.redirect(back.toString(), 303);
  }
  return Response.redirect(new URL('/', url).toString(), 303);
}
