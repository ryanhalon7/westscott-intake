import {requireChatGPTUser} from '../chatgpt-auth';
import {storage} from '@/lib/server-intake';
import type {StoredSubmission} from '@/lib/intake';
export const dynamic='force-dynamic';
export default async function Submissions(){
  const user=await requireChatGPTUser('/submissions');
  const rows=(await storage().db.prepare('SELECT * FROM submissions WHERE owner_id = ? ORDER BY created_at DESC LIMIT 100').bind(user.userId).all<StoredSubmission>()).results;
  return <main className="intake review"><a className="back" href="/">← New project</a><div className="eyebrow">WESTSCOTT / PROJECT INTAKE</div><h1>Your submissions.</h1><p className="intro">A record of the work you’ve shared.</p>{rows.length?rows.map(s=><a className="card submission-row" key={s.id} href={`/submissions/${s.id}`}><div><strong>{s.notes?s.notes.slice(0,75):'Voice project submission'}</strong><small>{new Date(s.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'America/New_York'})}</small></div><span className="badge">{s.status==='uploading'?'Upload incomplete':'Received'}</span></a>):<section className="card"><h2>Your next project starts here.</h2><p>No submissions yet.</p><a className="text-link" href="/">Send your first project ↗</a></section>}</main>;
}
