import {requireChatGPTUser} from './chatgpt-auth';
import IntakeForm from './intake-form';
import {SiteHeader} from '@/components/site-chrome';
export const dynamic='force-dynamic';
export default async function Home() {
  await requireChatGPTUser('/');
  return <><SiteHeader current="new"/><main className="intake"><h1>New project</h1><IntakeForm/></main></>;
}
