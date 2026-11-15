import { z } from 'zod';
export const MAX_FILE_BYTES = 20 * 1024 * 1024;
export const MAX_PHOTOS = 30;
export const fileSchema = z.object({
  id:z.string().uuid(), name:z.string().min(1).max(200), type:z.string().max(100),
  size:z.number().int().positive().max(MAX_FILE_BYTES), checksum:z.string().regex(/^[a-f0-9]{64}$/),kind:z.enum(['photo','audio']),
}).refine(f=>f.kind==='photo'
  ? /\.(jpe?g|png|webp|heic|heif)$/i.test(f.name) && (!f.type || /^image\/(jpeg|png|webp|heic|heif)$/.test(f.type))
  : /^audio\/(webm|mp4|mpeg|wav|ogg)(;.*)?$/.test(f.type),'Unsupported file type');
export const submissionSchema=z.object({id:z.string().uuid(),notes:z.string().max(20000),files:z.array(fileSchema).min(1).max(MAX_PHOTOS+1)}).superRefine((s,ctx)=>{
  const photos=s.files.filter(f=>f.kind==='photo'); const audio=s.files.filter(f=>f.kind==='audio');
  if(!photos.length || photos.length>MAX_PHOTOS) ctx.addIssue({code:'custom',message:'Add 1–30 project photos.'});
  if(audio.length>1 || (!audio.length && !s.notes.trim())) ctx.addIssue({code:'custom',message:'Record project details or type your notes.'});
  if(new Set(s.files.map(f=>f.id)).size!==s.files.length) ctx.addIssue({code:'custom',message:'Duplicate file identifiers.'});
});
export type SubmissionInput=z.infer<typeof submissionSchema>;
export type StoredSubmission={id:string;owner_id:string;notes:string;status:string;created_at:string;received_at:string|null;transcript:string|null;draft:string|null;processing_error:string|null};
export type StoredAsset={id:string;submission_id:string;name:string;type:string;size:number;checksum:string;kind:'photo'|'audio';storage_key:string;uploaded:number};
export async function sha256(bytes:ArrayBuffer){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');}
