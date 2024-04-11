import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import FlagIcon from '@mui/icons-material/Flag'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { styled } from '@mui/material'

import moment from 'moment'

const FlagBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})
const FlagText = styled('span')({
  fontSize: '0.7rem',
})
const IconBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: 35,
  height: 35,
  borderRadius: '50%',
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1,
}))
const LineBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateY(-50%)',
  height: 3,
  width: '100%',
  zIndex: 0,
}))

const TargetItemDurationFace = ({
  start,
  end,
}: {
  start: string
  end: string
}) => {
  const startTime = moment(start)
  const endTime = moment(end)
  const duration = endTime.diff(startTime)

  return (
    <section>
      <div className='flex mb-1'>
        <div className='flex-1 flex justify-center items-center relative'>
          <IconBox>
            <PlayArrowIcon fontSize='inherit' />
          </IconBox>
          <LineBox />
        </div>

        <div className='flex-1 flex justify-center items-center relative'>
          <IconBox>
            <HourglassBottomIcon fontSize='inherit' />
          </IconBox>
          <LineBox />
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <IconBox>
            <FlagIcon fontSize='inherit' />
          </IconBox>
        </div>
      </div>
      <div className='flex justify-around'>
        <FlagBox>
          <FlagText>(Start)</FlagText>
          <FlagText>{startTime.format('ll')}</FlagText>
          <FlagText>{startTime.format('h:mm A')}</FlagText>
        </FlagBox>

        <FlagBox>
          <FlagText>(Duration)</FlagText>
          <FlagText>{moment.duration(duration).humanize()}</FlagText>
        </FlagBox>

        <FlagBox>
          <FlagText>(End)</FlagText>
          <FlagText>{endTime.format('ll')}</FlagText>
          <FlagText>{endTime.format('h:mm A')}</FlagText>
        </FlagBox>
      </div>
    </section>
  )
}

export default TargetItemDurationFace
