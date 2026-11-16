import {redirect} from 'next/navigation';
import {getUser} from '@/app/auth';
import {safeNext} from '@/lib/auth';
import {AuthShell} from './auth-shell';
import {AuthForm} from './auth-form';
export const dynamic='force-dynamic';
export const metadata={title:'Sign in | WestScott Project Intake'};

export default async function Login({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const q=await searchParams;const next=safeNext(q.next);
  const user=await getUser();
  if(user)redirect(user.mustChangePassword?'/account/password':next);
  return <AuthShell title="Sign in">
    <p className="auth-sub">Project intake for the WestScott team.</p>
    {q.error&&<p className="error" role="alert">{q.error}</p>}
    <AuthForm action="/api/auth/login" submit="Sign in" pending="Signing in…" hidden={{to:next}} fields={[
      {name:'email',label:'Email',type:'email',autoComplete:'username',defaultValue:q.email,autoFocus:!q.email},
      {name:'password',label:'Password',type:'password',autoComplete:'current-password',autoFocus:!!q.email},
    ]}/>
    <p className="auth-help">Forgot your password? Ask the office to reset it.</p>
  </AuthShell>;
}
