'use client';
import {useState} from 'react';
export function RetryTranscription({id}:{id:string}){
  const[busy,set]=useState(false);const[err,setErr]=useState('');
  return <div><button type="button" disabled={busy} onClick={async()=>{set(true);setErr('');try{const r=await fetch(`/api/submissions/${id}/transcribe`,{method:'POST'});if(r.ok){location.reload();return;}setErr('Could not start. Try again.');}catch{setErr('Could not start. Check your connection and try again.');}set(false);}}>{busy?'Starting…':'Retry processing'}</button>{err&&<p className="retry-error" role="alert">{err}</p>}</div>;
}
