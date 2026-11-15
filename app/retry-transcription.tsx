'use client';
import {useState} from 'react';
export function RetryTranscription({id}:{id:string}){
  const[busy,set]=useState(false);const[err,setErr]=useState('');
  return <div><button type="button" disabled={busy} onClick={async()=>{set(true);setErr('');const r=await fetch(`/api/submissions/${id}/transcribe`,{method:'POST'});if(r.ok)location.reload();else{setErr('Could not start. Try again.');set(false);}}}>{busy?'Starting…':'Retry processing'}</button>{err&&<p className="muted">{err}</p>}</div>;
}
