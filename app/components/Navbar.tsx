'use client'

import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
  const currentRoute = usePathname()
  const router = useRouter()

  return (
    <AppBar
      position='relative'
      color='primary'
      variant='outlined'
      elevation={0}
    >
      <Toolbar>
        <Container
          disableGutters
          maxWidth='lg'
        >
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='h6'>Target Within</Typography>

            <Stack
              direction='row'
              alignItems='center'
            >
              <Button
                size='small'
                variant={currentRoute === '/' ? 'contained' : 'text'}
                color={currentRoute === '/' ? 'secondary' : 'inherit'}
                sx={{ textTransform: 'capitalize' }}
                onClick={() => router.push('/')}
              >
                Home
              </Button>
              <Button
                size='small'
                variant={currentRoute === '/about' ? 'contained' : 'text'}
                color={currentRoute === '/about' ? 'secondary' : 'inherit'}
                sx={{ textTransform: 'capitalize' }}
                onClick={() => router.push('/about')}
              >
                About
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
