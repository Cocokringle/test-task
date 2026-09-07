import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { Header } from '~/components/Header/Header'
import { Footer } from '~/components/Footer/Footer'
import TanStackProvider from '~/components/TanStackProvider/TanStackProvider'

const manrope = Manrope({
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
  subsets: ['latin'],
})

const siteUrl = ''
const title = ''
const description = ''

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    images: [''],
  },
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={manrope.variable}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  )
}
