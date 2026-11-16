import { login, safeNext, sessionCookie } from '@/lib/auth';

function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const secure = url.protocol === 'https:';
  if (!sameOrigin(request)) return new Response('Forbidden', { status: 403 });
  const fd = await request.formData();
  const form = { get: (n: string) => String(fd.get(n) ?? '') };
  const email = form.get('email');
  const next = safeNext(form.get('to') || '/');
  const result = await login(email, form.get('password'));
  if (!result.ok) {
    const back = new URL('/login', url);
    back.searchParams.set('error', result.error);
    back.searchParams.set('email', email.trim().slice(0, 200));
    if (next !== '/') back.searchParams.set('next', next);
    return Response.redirect(back.toString(), 303);
  }
  const target = result.user.mustChangePassword ? '/account/password' : next;
  return new Response(null, { status: 303, headers: { Location: target, 'Set-Cookie': sessionCookie(result.token, secure) } });
}
