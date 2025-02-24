import Providers from './providers';
import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'FossLink',
  description: 'Transform your home into an intelligent living space. Be the first to know when we launch our smart home automation solutions.',
  keywords: 'smart home, home automation, IoT, smart living, home security',
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  )
}
