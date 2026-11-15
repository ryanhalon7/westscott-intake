import {authorize,owned,storage,files,failure,startTranscription} from '@/lib/server-intake';
export async function POST(request:Request,context:{params:Promise<{id:string}>}){try{
  const user=await authorize(request);const{id}=await context.params;const s=await owned(id,user.userId);
  if(s.status!=='uploading')return Response.json({received:true,id});
  const assets=await files(id);const{db,bucket}=storage();
  for(const asset of assets){const object=await bucket.head(asset.storage_key);if(!asset.uploaded||!object||object.size!==asset.size||object.customMetadata?.sha256!==asset.checksum)return Response.json({error:'Some files are not safely stored yet. Please retry.'},{status:409});}
  await db.prepare("UPDATE submissions SET status = 'received', received_at = ? WHERE id = ? AND status = 'uploading'").bind(new Date().toISOString(),id).run();
  try{await startTranscription(id);}catch(e){console.error('Could not start transcription:',e instanceof Error?e.message:String(e));await db.prepare("UPDATE submissions SET processing_error = ? WHERE id = ?").bind('Transcription could not start. You can retry.',id).run();}
  return Response.json({received:true,id});
}catch(e){return failure(e);}}
