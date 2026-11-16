import {requireChatGPTUser} from '@/app/chatgpt-auth';
import {owned,files} from '@/lib/server-intake';
import {SiteHeader} from '@/components/site-chrome';
import {STATUS,titleOf} from '@/lib/status';
import {ArrowLeft} from 'lucide-react';
import {RetryTranscription} from '@/app/retry-transcription';
import {notFound} from 'next/navigation';
export const dynamic='force-dynamic';
type Draft={title?:string;location?:string|null;summary?:string;scope_of_work?:string[];challenges?:string|null;completed?:string|null};
export default async function Detail({params}:{params:Promise<{id:string}>}){
  const{id}=await params;const user=await requireChatGPTUser(`/submissions/${id}`);
  let submission;try{submission=await owned(id,user.userId);}catch(e){if(e instanceof Response&&e.status===404)notFound();throw e;}
  let draft:Draft|null=null;try{draft=submission.draft?JSON.parse(submission.draft) as Draft:null;}catch{}
  const assets=await files(id);const audio=assets.find(f=>f.kind==='audio'&&f.uploaded);const photos=assets.filter(f=>f.kind==='photo');
  const s=submission.status;
  const canRetry=!!submission.processing_error||(s==='received'&&!!audio);
  const notice=s==='uploading'?'Upload incomplete. Retry from the page you sent it from.':s==='processing'?'Writing the draft. Refresh in a minute.':submission.processing_error??(canRetry?'Not processed yet.':null);
  return <><SiteHeader current="submissions"/><main className="intake review">
    <a className="back" href="/submissions"><ArrowLeft size={16}/>Submissions</a>
    <h1>{titleOf(submission)}</h1>
    <p className="meta"><span className="badge">{STATUS[s]??'Received'}</span>{draft?.location&&<span>{draft.location}</span>}</p>
    {notice&&<div className="notice"><p>{notice}</p>{canRetry&&s!=='processing'&&<RetryTranscription id={id}/>}</div>}
    {draft&&<section className="card"><h2>Draft</h2>
      {draft.summary&&<p className="source-notes">{draft.summary}</p>}
      {!!draft.scope_of_work?.length&&<ul>{draft.scope_of_work.map((x,i)=><li key={i}>{x}</li>)}</ul>}
      {draft.challenges&&<p className="source-notes"><strong>Challenges:</strong> {draft.challenges}</p>}
      {draft.completed&&<p className="source-notes"><strong>Completed:</strong> {draft.completed}</p>}
    </section>}
    <section className="card"><h2>Your notes</h2>
      {audio&&<audio controls src={`/api/submissions/${id}/files/${audio.id}`}/>}
      {submission.transcript&&<p className="source-notes">{submission.transcript}</p>}
      {submission.notes&&<p className="source-notes">{submission.notes}</p>}
    </section>
    <section className="card"><h2>Photos<span className="count"> · {photos.length}</span></h2><div className="photo-grid saved">{photos.map(p=><a className="photo" key={p.id} href={p.uploaded?`/api/submissions/${id}/files/${p.id}`:undefined} target="_blank" rel="noreferrer">{p.uploaded&&!/\.hei[cf]$/i.test(p.name)?<img src={`/api/submissions/${id}/files/${p.id}`} alt={p.name}/>:<div className="heic">{p.uploaded?'HEIC photo':'Not uploaded'}</div>}</a>)}</div></section>
  </main></>;
}
