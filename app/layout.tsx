import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'WestScott | Project Intake',description:'A private place to share your latest WestScott project.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
