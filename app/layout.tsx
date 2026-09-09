import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from '~/components/Header/Header'
import TanStackProvider from '~/components/TanStackProvider/TanStackProvider'
import { ToastProvider } from '~/components/ToastProvider/ToastProvider'

const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
  subsets: ['latin'],
})

const title = 'RentalCar'
const description = 'Reliable and budget-friendly car rentals for any journey.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={manrope.variable}>
        <TanStackProvider>
          <Header />
          {children}
          <ToastProvider />
        </TanStackProvider>
      </body>
    </html>
  )
}
