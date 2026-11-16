export function AuthShell({title,children}:{title:string;children:React.ReactNode}){
  return <main className="auth">
    <picture className="auth-photo">
      <source srcSet="/login.avif" type="image/avif"/>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/login.webp" alt="" fetchPriority="high"/>
    </picture>
    <section className="auth-panel" aria-labelledby="auth-title">
      <div className="auth-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="auth-logo" src="/westscott-logo.png" alt="WestScott Construction" width={76} height={76}/>
        <h1 id="auth-title">{title}</h1>
        {children}
      </div>
    </section>
  </main>;
}
