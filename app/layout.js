import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Website!',
  description: 'This is my webpage',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
