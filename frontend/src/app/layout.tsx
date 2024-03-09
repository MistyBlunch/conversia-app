import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { ReduxProvider } from '@/redux/providers'

import 'react-toastify/dist/ReactToastify.css';

import './globals.css'

const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Conversia App',
  description: 'Created by MistyBlunch'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={lato.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
