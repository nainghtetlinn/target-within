import type { Metadata } from 'next'
import './globals.css'

import ThemeProvider from '@/providers/themeProvider'
import LocalizationProvider from '@/providers/localizationProvider'
import StoreProvider from '@/providers/storeProvider'

import Navbar from './components/Navbar'

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
      <body>
        <ThemeProvider>
          <LocalizationProvider>
            <StoreProvider>
              <Navbar />
              <main>{children}</main>
            </StoreProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
