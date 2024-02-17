'use client'

import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { PropsWithChildren } from 'react'

const LocalizationProvider = ({ children }: PropsWithChildren) => {
  return (
    <MuiLocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </MuiLocalizationProvider>
  )
}

export default LocalizationProvider
