import {authorize,owned,startTranscription,failure} from '@/lib/server-intake';
export async function POST(request:Request,context:{params:Promise<{id:string}>}){try{
  const user=await authorize(request);const{id}=await context.params;const s=await owned(id,user.userId);
  if(s.status==='uploading'||s.status==='processing')return Response.json({error:'Not ready to process.'},{status:409});
  await startTranscription(id);
  return Response.json({started:true});
}catch(e){return failure(e);}}
