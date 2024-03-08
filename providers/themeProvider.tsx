'use client'

import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  createTheme,
  Theme,
} from '@mui/material'
import type { PropsWithChildren } from 'react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const theme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#460000',
    },
    secondary: {
      main: '#bd1c1c',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        margin: 'dense',
      },
    },
  },
})

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
