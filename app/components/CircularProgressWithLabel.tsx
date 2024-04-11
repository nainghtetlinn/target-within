import { Typography, Box, CircularProgress } from '@mui/material'

import type { CircularProgressProps } from '@mui/material'

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: theme =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={50}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant='determinate'
        color={props.value === 100 ? 'success' : 'primary'}
        sx={{ position: 'absolute', left: 0 }}
        size={50}
        thickness={4}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='inherit'
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export default CircularProgressWithLabel
