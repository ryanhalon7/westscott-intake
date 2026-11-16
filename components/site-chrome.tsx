import {chatGPTSignOutPath} from '@/app/chatgpt-auth';
import {LogOut} from 'lucide-react';

export function SiteHeader({current}:{current?:'new'|'submissions'}){
  return <header className="topbar"><div className="topbar-inner">
    <a className="brand-mark" href="/" aria-label="WestScott Construction project intake, home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/westscott-logo.png" alt="" width={52} height={52}/>
      <span><strong>Project intake</strong><small>WestScott Construction</small></span>
    </a>
    <nav aria-label="Main">
      <a className="nav-new" href="/" aria-current={current==='new'?'page':undefined}>New</a>
      <a href="/submissions" aria-current={current==='submissions'?'page':undefined}>Submissions</a>
      <a href={chatGPTSignOutPath('/')} target="_top" aria-label="Sign out"><LogOut size={18} aria-hidden="true"/><span className="nav-label">Sign out</span></a>
    </nav>
  </div></header>;
}

export function SiteFooter(){
  return <footer><strong>WestScott Construction</strong><span>Respecting your time and property since 2002 · <a href="tel:+18508419102">850-841-9102</a></span></footer>;
}
