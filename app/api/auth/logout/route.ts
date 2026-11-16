import { clearCookie, logout, readCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return new Response('Forbidden', { status: 403 });
  await logout(readCookie(request.headers.get('cookie')));
  const secure = new URL(request.url).protocol === 'https:';
  return new Response(null, { status: 303, headers: { Location: '/login', 'Set-Cookie': clearCookie(secure) } });
}
