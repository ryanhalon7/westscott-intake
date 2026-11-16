import {LogOut} from 'lucide-react';

export function SiteHeader({current}:{current?:'new'|'submissions'}){
  return <header className="topbar"><div className="topbar-inner">
    <a className="brand-mark" href="/" aria-label="WestScott Construction project intake, home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/westscott-logo.png" alt="" width={52} height={52}/>
      <strong>Project intake</strong>
    </a>
    <nav aria-label="Main">
      <a className="nav-new" href="/" aria-current={current==='new'?'page':undefined}>New</a>
      <a href="/submissions" aria-current={current==='submissions'?'page':undefined}>Submissions</a>
      <form method="post" action="/api/auth/logout"><button type="submit" aria-label="Sign out"><LogOut size={18} aria-hidden="true"/><span className="nav-label">Sign out</span></button></form>
    </nav>
  </div></header>;
}
