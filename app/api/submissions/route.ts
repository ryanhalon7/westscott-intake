import {submissionSchema} from '@/lib/intake';
import {authorize,storage,failure,owned,files} from '@/lib/server-intake';
export async function POST(request:Request){try{
  const user=await authorize(request);const body=await request.text();
  if(body.length>60000)return Response.json({error:'Submission is too large.'},{status:413});
  let raw:unknown;try{raw=JSON.parse(body);}catch{return Response.json({error:'Invalid submission.'},{status:400});}
  const result=submissionSchema.safeParse(raw);
  if(!result.success)return Response.json({error:result.error.issues[0].message},{status:400});
  const s=result.data;const {db}=storage();
  const existing=await db.prepare('SELECT owner_id FROM submissions WHERE id = ?').bind(s.id).first<{owner_id:string}>();
  if(!existing){try{
    await db.batch([
      db.prepare('INSERT INTO submissions (id,owner_id,notes,status,created_at) VALUES (?,?,?,?,?)').bind(s.id,user.userId,s.notes,'uploading',new Date().toISOString()),
      ...s.files.map(f=>db.prepare('INSERT INTO assets (id,submission_id,name,type,size,checksum,kind,storage_key,uploaded) VALUES (?,?,?,?,?,?,?,?,0)').bind(f.id,s.id,f.name,f.type||'application/octet-stream',f.size,f.checksum,f.kind,`${user.userId}/${s.id}/${f.id}`)),
    ]);
  }catch(e){const raced=await db.prepare('SELECT owner_id FROM submissions WHERE id = ?').bind(s.id).first<{owner_id:string}>();if(!raced||raced.owner_id!==user.userId)throw e;}}
  const row=await owned(s.id,user.userId);const assets=await files(s.id);
  if(row.notes!==s.notes||assets.length!==s.files.length||assets.some(f=>!s.files.some(i=>i.id===f.id&&i.checksum===f.checksum&&i.size===f.size&&i.kind===f.kind&&i.name===f.name&&(i.type||'application/octet-stream')===f.type)))return Response.json({error:'This upload has different content. Start a new submission.'},{status:409});
  return Response.json({id:s.id,status:row.status,uploaded:assets.filter(f=>f.uploaded).map(f=>f.id)});
}catch(e){return failure(e);}}
