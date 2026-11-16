import {requireChatGPTUser} from '../chatgpt-auth';
import {SiteHeader,SiteFooter} from '@/components/site-chrome';
import {ArrowUpRight} from 'lucide-react';
import {storage} from '@/lib/server-intake';
import type {StoredSubmission} from '@/lib/intake';
export const dynamic='force-dynamic';
const STATUS:Record<string,string>={uploading:'Upload incomplete',received:'Received',processing:'Processing',transcribed:'Transcribed',drafted:'Draft ready'};
function titleOf(s:StoredSubmission){
  try{const d=s.draft?JSON.parse(s.draft) as {title?:string}:null;if(d?.title)return d.title;}catch{}
  const text=(s.notes||s.transcript||'').trim();
  return text?(text.length>75?text.slice(0,75)+'…':text):'Voice note submission';
}
export default async function Submissions(){
  const user=await requireChatGPTUser('/submissions');
  const rows=(await storage().db.prepare('SELECT * FROM submissions WHERE owner_id = ? ORDER BY created_at DESC LIMIT 100').bind(user.userId).all<StoredSubmission>()).results;
  return <><SiteHeader current="submissions"/><main className="intake review"><h1>Your submissions</h1><p className="intro">A record of the work you’ve shared.</p>{rows.length?rows.map(s=><a className="card submission-row" key={s.id} href={`/submissions/${s.id}`}><div><strong>{titleOf(s)}</strong><small>{new Date(s.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'America/New_York'})}</small></div><span className="badge">{STATUS[s.status]??'Received'}</span></a>):<section className="card"><h2>Your next project starts here.</h2><p className="prompt">No submissions yet. Projects you send from New appear here with their review status.</p><a className="text-link" href="/">Send your first project <ArrowUpRight size={18}/></a></section>}</main><SiteFooter/></>;
}
