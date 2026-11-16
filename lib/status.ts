import type {StoredSubmission} from './intake';
export const STATUS:Record<string,string>={uploading:'Upload incomplete',received:'Received',processing:'Processing',transcribed:'Transcribed',drafted:'Draft ready'};
export function titleOf(s:StoredSubmission){
  try{const d=s.draft?JSON.parse(s.draft) as {title?:string}:null;if(d?.title)return d.title;}catch{}
  const text=(s.notes||s.transcript||'').trim();
  return text?(text.length>75?text.slice(0,75)+'…':text):'Untitled project';
}
