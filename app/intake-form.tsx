'use client';
import {useEffect,useRef,useState} from 'react';
import {Mic,Square,Plus,X,ArrowUpRight,Check,LockKeyhole,RotateCcw,ImagePlus} from 'lucide-react';
import {MAX_FILE_BYTES,MAX_PHOTOS,sha256,submissionSchema,type SubmissionInput} from '@/lib/intake';
type LocalFile={id:string;file:File;url:string;kind:'photo'|'audio'};
async function jsonRequest(url:string,body:unknown){const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const data=await r.json().catch(()=>({error:'Please sign in again or retry.'})) as {error?:string;id:string;status?:string;uploaded:string[]};if(!r.ok)throw new Error(data.error||'Please retry.');return data;}
function upload(url:string,file:File,progress:(n:number)=>void){return new Promise<void>((resolve,reject)=>{const xhr=new XMLHttpRequest();xhr.open('PUT',url);xhr.timeout=120000;xhr.upload.onprogress=e=>progress(e.loaded);xhr.onload=()=>xhr.status>=200&&xhr.status<300?resolve():reject(new Error('A file could not upload. Tap Retry to continue.'));xhr.onerror=()=>reject(new Error('Connection interrupted. Tap Retry when you are back online.'));xhr.ontimeout=()=>reject(new Error('Upload timed out. Tap Retry to continue.'));xhr.send(file);});}
export default function IntakeForm(){
  const[notes,setNotes]=useState('');const[typing,setTyping]=useState(false);const[photos,setPhotos]=useState<LocalFile[]>([]);const[audio,setAudio]=useState<LocalFile|null>(null);
  const[recording,setRecording]=useState(false);const[starting,setStarting]=useState(false);const[seconds,setSeconds]=useState(0);const[busy,setBusy]=useState(false);const[locked,setLocked]=useState(false);const[error,setError]=useState('');const[progress,setProgress]=useState(0);const[stage,setStage]=useState('');const[received,setReceived]=useState('');
  const recorder=useRef<MediaRecorder|null>(null);const stream=useRef<MediaStream|null>(null);const picker=useRef<HTMLInputElement|null>(null);const manifest=useRef<SubmissionInput|null>(null);const sending=useRef(false);const urls=useRef(new Set<string>());
  useEffect(()=>()=>{stream.current?.getTracks().forEach(t=>t.stop());for(const url of urls.current)URL.revokeObjectURL(url);},[]);
  useEffect(()=>{if(!recording)return;const timer=setInterval(()=>setSeconds(s=>{if(s>=299){recorder.current?.stop();return 300;}return s+1;}),1000);return()=>clearInterval(timer);},[recording]);
  function local(file:File,kind:'photo'|'audio'):LocalFile{const url=URL.createObjectURL(file);urls.current.add(url);return{id:crypto.randomUUID(),file,url,kind};}
  function release(file:LocalFile){URL.revokeObjectURL(file.url);urls.current.delete(file.url);}
  async function record(){
    setError('');setStarting(true);
    try{
      if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined')throw new Error('Recording is unavailable in this browser. Please use Type instead.');
      stream.current=await navigator.mediaDevices.getUserMedia({audio:true});
      const mime=['audio/webm;codecs=opus','audio/mp4','audio/webm'].find(t=>MediaRecorder.isTypeSupported(t));
      const r=new MediaRecorder(stream.current,mime?{mimeType:mime,audioBitsPerSecond:64000}:undefined);recorder.current=r;
      const chunks:Blob[]=[];r.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
      r.onstop=()=>{stream.current?.getTracks().forEach(t=>t.stop());setRecording(false);const type=r.mimeType||chunks[0]?.type||'audio/webm';const file=new File(chunks,`project-note.${type.includes('mp4')?'m4a':'webm'}`,{type});if(file.size===0||file.size>MAX_FILE_BYTES){setError('Recording could not be saved. Please record a shorter note or type instead.');return;}if(audio)release(audio);setAudio(local(file,'audio'));};
      r.onerror=()=>{stream.current?.getTracks().forEach(t=>t.stop());setRecording(false);setError('Recording stopped unexpectedly. Please check playback or type your notes.');};
      setSeconds(0);r.start(1000);setRecording(true);
    }catch(e){stream.current?.getTracks().forEach(t=>t.stop());setError(e instanceof Error&&e.name==='NotAllowedError'?'Microphone access was declined. Allow it in your browser or use Type instead.':e instanceof Error?e.message:'Recording is unavailable. Please type instead.');setTyping(true);}finally{setStarting(false);}
  }
  function addPhotos(list:FileList|null){if(!list)return;setError('');const added:LocalFile[]=[];for(const file of Array.from(list)){if(photos.length+added.length>=MAX_PHOTOS){setError('You can add up to 30 photos.');break;}if(!/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)||file.size>MAX_FILE_BYTES||!file.size){setError('Use JPG, PNG, WebP, or HEIC photos under 20 MB each.');continue;}if(photos.some(p=>p.file.name===file.name&&p.file.size===file.size&&p.file.lastModified===file.lastModified))continue;added.push(local(file,'photo'));}setPhotos(p=>[...p,...added]);if(picker.current)picker.current.value='';}
  async function send(){
    if(sending.current)return;sending.current=true;setError('');setBusy(true);
    try{
      const all=[...photos,...(audio?[audio]:[])];
      if(!manifest.current){
        setStage('Preparing your files…');
        const files=[];for(const f of all)files.push({id:f.id,name:f.file.name,type:f.file.type,size:f.file.size,kind:f.kind,checksum:await sha256(await f.file.arrayBuffer())});
        const parsed=submissionSchema.safeParse({id:crypto.randomUUID(),notes,files});
        if(!parsed.success)throw new Error(parsed.error.issues[0].message);
        manifest.current=parsed.data;setLocked(true);
      }
      const s=manifest.current;const result=await jsonRequest('/api/submissions',s);
      const total=all.reduce((n,f)=>n+f.file.size,0);let done=all.filter(f=>result.uploaded.includes(f.id)).reduce((n,f)=>n+f.file.size,0);
      for(const [index,f] of all.entries()){
        if(result.uploaded.includes(f.id))continue;
        setStage(`Uploading file ${index+1} of ${all.length}`);
        let last:unknown;
        for(let attempt=0;attempt<3;attempt++){try{await upload(`/api/submissions/${s.id}/files/${f.id}`,f.file,n=>setProgress(Math.min(99,Math.round((done+n)/total*100))));last=null;break;}catch(e){last=e;if(attempt<2)await new Promise(r=>setTimeout(r,1000*(attempt+1)));}}
        if(last)throw last;done+=f.file.size;setProgress(Math.min(99,Math.round(done/total*100)));
      }
      setStage('Checking your saved files…');await jsonRequest(`/api/submissions/${s.id}/complete`,{});setProgress(100);setReceived(s.id);
    }catch(e){setError(e instanceof Error?e.message:'Please retry your submission.');}finally{sending.current=false;setBusy(false);}
  }
  if(received)return <section className="card receipt" aria-live="polite"><div className="success-icon"><Check size={30}/></div><div className="eyebrow">SAFELY STORED</div><h2>Submission received.</h2><p>Your notes and photos are saved. You can close this page now.</p><p className="muted">Your project has not been published. It will need a content preview and approval first.</p><a className="primary" href={`/submissions/${received}`}>View submission <ArrowUpRight size={18}/></a><a className="text-link" href="/">Send another project</a></section>;
  return <><section className="card"><div className="section-heading"><span className="step">01</span><h2>Tell the story</h2><span className="hint">VOICE OR TEXT</span></div><p className="prompt">Tell us about the project—its name and location, what your team completed, any challenges and how you handled them, and when the work finished.</p>
    <div className={`recorder ${recording?'active':''}`}><button className="mic" onClick={()=>recording?recorder.current?.stop():void record()} disabled={locked||starting} aria-label={recording?'Stop recording':'Record project details'}>{recording?<Square fill="currentColor" size={22}/>:<Mic size={28}/>}</button><div><strong>{recording?'Recording your story…':starting?'Opening microphone…':audio?'Your voice note is ready':'Record project details'}</strong><p>{recording?`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} · Tap to stop`:'A quick voice note is all it takes. Up to 5 minutes.'}</p></div></div>
    {audio&&!recording&&<div className="audio-row"><audio controls src={audio.url}/><button className="icon-button" title="Remove recording" aria-label="Remove recording" disabled={locked} onClick={()=>{release(audio);setAudio(null);}}><RotateCcw size={18}/></button></div>}
    <button className="text-link" disabled={locked} onClick={()=>setTyping(!typing)}>{typing?'Hide written notes':audio?'Add written details':'Type instead'} <span>↗</span></button>
    {typing&&<div className="notes"><label htmlFor="notes">Project notes</label><textarea id="notes" rows={6} maxLength={20000} value={notes} disabled={locked} onChange={e=>setNotes(e.target.value)} placeholder="Project name, location, scope of work, and completion date…"/><small>Only share details you want included in the project story.</small></div>}
  </section><section className="card"><div className="section-heading"><span className="step">02</span><h2>Add the photos</h2><span className="hint">{photos.length?`${photos.length} SELECTED`:'FINISHED WORK + DETAILS'}</span></div><p className="prompt">Show the finished space, the details, and the work along the way.</p><input ref={picker} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif" multiple hidden onChange={e=>addPhotos(e.target.files)}/>
    {!!photos.length&&<div className="photo-grid">{photos.map(p=><div className="photo" key={p.id}>{/\.hei[cf]$/i.test(p.file.name)?<div className="heic"><ImagePlus/><small>HEIC original</small></div>:<img src={p.url} alt={p.file.name}/>}<button aria-label={`Remove ${p.file.name}`} disabled={locked} onClick={()=>{release(p);setPhotos(old=>old.filter(f=>f.id!==p.id));}}><X size={15}/></button><small>{p.file.name}</small></div>)}</div>}
    <button className="photo-picker" disabled={locked||photos.length>=MAX_PHOTOS} onClick={()=>picker.current?.click()}><span className="plus"><Plus size={24}/></span><strong>{photos.length?'Add more photos':'Choose project photos'}</strong><small>JPG, PNG, WebP or HEIC · Up to 30 photos · 20 MB each</small></button>
  </section><div className="send-area"><p><LockKeyhole size={15}/> Private submission. Reviewed before publication.</p>{error&&<div className="error" role="alert">{error}</div>}{busy&&<div className="upload-progress" aria-live="polite"><div><span>{stage}</span><strong>{progress}%</strong></div><progress max={100} value={progress}/></div>}<button className="primary" onClick={()=>void send()} disabled={busy||recording||starting}>{busy?'Sending project…':locked?'Retry submission':'Send project'}<ArrowUpRight size={22}/></button><small>{locked?'Keep this page open until you see Submission received.':'Your project stays private until it has been reviewed and approved.'}</small></div></>;
}
