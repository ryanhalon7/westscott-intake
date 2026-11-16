'use client';
import {useState} from 'react';
import {Eye,EyeOff,ArrowRight} from 'lucide-react';

type Field={name:string;label:string;type:'email'|'password';autoComplete:string;defaultValue?:string;autoFocus?:boolean};

export function AuthForm({action,fields,hidden,submit,pending}:{action:string;fields:Field[];hidden?:Record<string,string>;submit:string;pending:string}){
  const[busy,setBusy]=useState(false);
  const[shown,setShown]=useState(false);
  return <form className="auth-form" method="post" action={action} onSubmit={()=>setBusy(true)}>
    {fields.map(f=><div className="field" key={f.name}>
      <label htmlFor={f.name}>{f.label}</label>
      <div className="input-wrap">
        <input id={f.name} name={f.name} type={f.type==='password'&&shown?'text':f.type} autoComplete={f.autoComplete} defaultValue={f.defaultValue} autoFocus={f.autoFocus} required spellCheck={false} autoCapitalize="none" inputMode={f.type==='email'?'email':undefined}/>
        {f.type==='password'&&<button type="button" className="reveal" onClick={()=>setShown(s=>!s)} aria-label={shown?'Hide password':'Show password'} aria-pressed={shown}>{shown?<EyeOff size={20}/>:<Eye size={20}/>}</button>}
      </div>
    </div>)}
    {hidden&&Object.entries(hidden).map(([k,v])=><input key={k} type="hidden" name={k} value={v}/>)}
    <button className="primary" type="submit" disabled={busy} aria-busy={busy}>{busy?pending:submit}<ArrowRight size={22}/></button>
  </form>;
}
