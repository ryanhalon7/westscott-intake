import {MAX_FILE_BYTES,sha256} from '@/lib/intake';
import {authorize,owned,storage,files,failure} from '@/lib/server-intake';
type Context={params:Promise<{id:string;assetId:string}>};
export async function PUT(request:Request,context:Context){try{
  const user=await authorize(request);const{id,assetId}=await context.params;
  const s=await owned(id,user.userId);const asset=(await files(id)).find(f=>f.id===assetId);
  if(!asset)return new Response('File not found',{status:404});
  if(s.status!=='uploading')return new Response('Submission is already received',{status:409});
  const{db,bucket}=storage();if(asset.uploaded&&await bucket.head(asset.storage_key))return Response.json({uploaded:true});
  const reader=request.body?.getReader();if(!reader)return new Response('Missing file',{status:400});
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const chunk=await reader.read();if(chunk.done)break;size+=chunk.value.byteLength;if(size>MAX_FILE_BYTES||size>asset.size){await reader.cancel();return new Response('File too large',{status:413});}chunks.push(chunk.value);}
  const data=new Uint8Array(size);let offset=0;for(const chunk of chunks){data.set(chunk,offset);offset+=chunk.length;}
  if(size!==asset.size||await sha256(data.buffer)!==asset.checksum)return new Response('File verification failed. Retry the upload.',{status:400});
  await bucket.put(asset.storage_key,data,{httpMetadata:{contentType:asset.type},customMetadata:{sha256:asset.checksum}});
  await db.prepare('UPDATE assets SET uploaded = 1 WHERE id = ?').bind(assetId).run();return Response.json({uploaded:true});
}catch(e){return failure(e);}}
export async function GET(request:Request,context:Context){try{
  const user=await authorize();const{id,assetId}=await context.params;await owned(id,user.userId);
  const asset=(await files(id)).find(f=>f.id===assetId&&f.uploaded);if(!asset)return new Response('File not found',{status:404});
  const object=await storage().bucket.get(asset.storage_key);if(!object)return new Response('File not found',{status:404});
  return new Response(object.body,{headers:{'Content-Type':asset.type,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Content-Disposition':`inline; filename*=UTF-8''${encodeURIComponent(asset.name)}`}});
}catch(e){return failure(e);}}
