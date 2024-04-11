'use client'

import AddIcon from '@mui/icons-material/Add'

import { Fab } from '@mui/material'
import { useRouter } from 'next/navigation'

const CreateNewTargetButton = () => {
  const router = useRouter()
  return (
    <Fab
      color='primary'
      sx={{
        position: 'fixed',
        bottom: 12,
        right: 12,
      }}
      onClick={() => router.push('/create')}
    >
      <AddIcon color='inherit' />
    </Fab>
  )
}

export default CreateNewTargetButton
