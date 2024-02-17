import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

import LocalizationProvider from '@/providers/localizationProvider'
import StoreProvider from '@/providers/storeProvider'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Target within',
  description: 'To do app with powers',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <LocalizationProvider>
          <StoreProvider>
            <main>{children}</main>
          </StoreProvider>
        </LocalizationProvider>
      </body>
    </html>
  )
}
