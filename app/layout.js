import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import Navbar from './components/Navbar';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>IntelliHire- AI Powered Resume Analyzer</title>
          <link rel='icon' href='/favicon.png' sizes='32x32'/>

      </head>
    <body className="bg-gray-50 text-gray-800">
      <Navbar/>
       <main className="max-w-5xl mx-auto p-4">{children}</main>
       <Analytics/> 
      
      </body>
    </html>
  );
}
