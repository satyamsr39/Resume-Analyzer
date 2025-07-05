import './globals.css'
import Navbar from './components/Navbar';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className="bg-gray-50 text-gray-800">
      <Navbar/>
       <main className="max-w-5xl mx-auto p-4">{children}</main> 
      
      </body>
    </html>
  );
}
