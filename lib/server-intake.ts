import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import type { StoredSubmission, StoredAsset } from './intake';
export function storage(){if(!env.DB || !env.BUCKET)throw new Error('Storage is not configured.');return {db:env.DB,bucket:env.BUCKET};}
export async function authorize(request?:Request){
  if(request && !['GET','HEAD'].includes(request.method)){
    const origin=request.headers.get('origin');
    if(origin && origin!==new URL(request.url).origin)throw new Response('Forbidden',{status:403});
  }
  const user=await getChatGPTUser();if(!user)throw new Response('Sign in required',{status:401});return user;
}
export async function owned(id:string,ownerId:string){
  const row=await storage().db.prepare('SELECT * FROM submissions WHERE id = ? AND owner_id = ?').bind(id,ownerId).first<StoredSubmission>();
  if(!row)throw new Response('Submission not found',{status:404});return row;
}
export async function files(id:string){return(await storage().db.prepare('SELECT * FROM assets WHERE submission_id = ? ORDER BY rowid').bind(id).all<StoredAsset>()).results;}
export function failure(error:unknown){
  if(error instanceof Response)return error;
  console.error('Intake operation failed:',error instanceof Error?error.name:'Unknown error');
  return Response.json({error:'This step could not finish. Your stored files are safe; please retry.'},{status:500});
}
export async function startTranscription(id:string){
  if(!env.TRANSCRIBE)throw new Error('Transcription is not configured.');
  // Unique instance per attempt so retries are allowed.
  let last:unknown;
  for(let attempt=0;attempt<3;attempt++){
    try{await env.TRANSCRIBE.create({id:`${id}-${Date.now()}`,params:{submissionId:id}});return;}
    catch(e){last=e;await new Promise(r=>setTimeout(r,500*(attempt+1)));}
  }
  throw last;
}
