import {requireChatGPTUser} from './chatgpt-auth';
import IntakeForm from './intake-form';
import {SiteHeader,SiteFooter} from '@/components/site-chrome';
export const dynamic='force-dynamic';
export default async function Home() {
  await requireChatGPTUser('/');
  return <><SiteHeader current="new"/><main className="intake"><h1>Good work.<br/><span>Worth sharing.</span></h1><p className="intro">Tell us what you built and add a few photos. We’ll take it from there.</p><IntakeForm/></main><SiteFooter/></>;
}
