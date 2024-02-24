'use client'

import AddIcon from '@mui/icons-material/Add'

import { Fab } from '@mui/material'
import { useRouter } from 'next/navigation'

const CreateNewTargetButton = () => {
  const router = useRouter()
  return (
    <Fab
      color='primary'
      className='fixed bottom-8 right-12'
      onClick={() => router.push('/create')}
    >
      <AddIcon color='inherit' />
    </Fab>
  )
}

export default CreateNewTargetButton
