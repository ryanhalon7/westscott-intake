import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={
  title:'WestScott | Project Intake',
  description:'A private place to share your latest WestScott project.',
  robots:{index:false,follow:false},
  icons:{
    icon:[{url:'/favicon.ico',sizes:'any'},{url:'/icon-32.png',type:'image/png',sizes:'32x32'},{url:'/icon-192.png',type:'image/png',sizes:'192x192'}],
    apple:{url:'/apple-touch-icon.png',sizes:'180x180'},
  },
};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
