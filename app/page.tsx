import {requireChatGPTUser,chatGPTSignOutPath} from './chatgpt-auth';
import IntakeForm from './intake-form';
export const dynamic='force-dynamic';
export default async function Home() {
  await requireChatGPTUser('/');
  return <><header className="topbar"><a className="wordmark" href="/">WEST<span>SCOTT</span><small>CONSTRUCTION</small></a><nav><a href="/submissions">Submissions</a><a href={chatGPTSignOutPath('/')} target="_top">Sign out</a></nav></header><main className="intake"><div className="eyebrow">PROJECT INTAKE <span>PRIVATE</span></div><h1>Good work.<br/><span>Worth sharing.</span></h1><p className="intro">Tell us what you built. Add a few photos.<br/>We’ll take it from there.</p><IntakeForm/></main><footer>WESTSCOTT CONSTRUCTION <span>Built with care. Shared with confidence.</span></footer></>;
}
