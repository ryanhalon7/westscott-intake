import {requireUser} from '@/app/auth';
import {AuthShell} from '@/app/login/auth-shell';
import {AuthForm} from '@/app/login/auth-form';
export const dynamic='force-dynamic';
export const metadata={title:'Set your password | WestScott Project Intake'};

export default async function Password({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const q=await searchParams;
  const user=await requireUser('/account/password',{allowMustChange:true});
  return <AuthShell title={user.mustChangePassword?'Set your password':'Change password'}>
    <p className="auth-sub">{user.mustChangePassword?'Replace your temporary password. ':''}At least 10 characters.</p>
    {q.error&&<p className="error" role="alert">{q.error}</p>}
    <AuthForm action="/api/auth/password" submit="Save password" pending="Saving…" fields={[
      {name:'current',label:user.mustChangePassword?'Temporary password':'Current password',type:'password',autoComplete:'current-password',autoFocus:true},
      {name:'password',label:'New password',type:'password',autoComplete:'new-password'},
      {name:'confirm',label:'Confirm new password',type:'password',autoComplete:'new-password'},
    ]}/>
    {!user.mustChangePassword&&<p className="auth-help"><a className="inline-link" href="/">Back to the app</a></p>}
  </AuthShell>;
}
