import {requireChatGPTUser} from '../chatgpt-auth';
import {SiteHeader} from '@/components/site-chrome';
import {storage} from '@/lib/server-intake';
import {STATUS,titleOf} from '@/lib/status';
import type {StoredSubmission} from '@/lib/intake';
export const dynamic='force-dynamic';
export default async function Submissions(){
  const user=await requireChatGPTUser('/submissions');
  const rows=(await storage().db.prepare('SELECT * FROM submissions WHERE owner_id = ? ORDER BY created_at DESC LIMIT 100').bind(user.userId).all<StoredSubmission>()).results;
  return <><SiteHeader current="submissions"/><main className="intake review"><h1>Submissions</h1>
    {rows.length?rows.map(s=><a className="card submission-row" key={s.id} href={`/submissions/${s.id}`}><div><strong>{titleOf(s)}</strong><small>{new Date(s.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'America/New_York'})}</small></div><span className="badge">{STATUS[s.status]??'Received'}</span></a>)
    :<p className="prompt">Nothing sent yet. <a className="inline-link" href="/">Send a project</a></p>}
  </main></>;
}
