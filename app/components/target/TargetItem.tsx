'use client'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import {
  Box,
  Card,
  CardHeader,
  CardActions,
  Collapse,
  IconButton,
  Button,
  styled,
  Typography,
  LinearProgress,
} from '@mui/material'

import CircularProgressWithLabel from '../CircularProgressWithLabel'
import TargetItemDurationFace from './TargetItemDurationFace'
import TasksList from './TaskList'
import ConfirmDeleteDialog from '../ConfirmDeleteDialog'

import type { IconButtonProps } from '@mui/material'
import type { TargetType } from '@/types/target'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import moment from 'moment'

import { useAppDispatch } from '@/lib/hook'
import { deleteTarget } from '@/lib/features/target'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled(({ expand, ...other }: ExpandMoreProps) => {
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const TargetItem = ({ target }: { target: TargetType }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const [open, setOpen] = useState(false)

  const { status, timeLeftPercentage, completedTasksPercentage } =
    useMemo(() => {
      const start = moment(target.startedDate)
      const end = moment(target.dueDate)
      const now = moment()

      const totalRange = end.diff(start)
      const currentRange = now.diff(start)

      const timeLeftPercentage =
        100 - Math.floor((currentRange / totalRange) * 100)

      let status =
        timeLeftPercentage <= 0
          ? "Time's up"
          : `Complete within ${end.fromNow(true)}`

      if (target.completedTasks === target.totalTasks) {
        status = ''
      }

      return {
        status,
        timeLeftPercentage: timeLeftPercentage < 0 ? 0 : timeLeftPercentage,
        completedTasksPercentage: Math.floor(
          (target.completedTasks / target.totalTasks) * 100
        ),
      }
    }, [
      target.startedDate,
      target.dueDate,
      target.totalTasks,
      target.completedTasks,
    ])

  const handleDelete = () => {
    dispatch(deleteTarget({ targetId: target.id }))
    setOpen(false)
  }

  const handleEdit = () => {
    router.push('/edit/' + target.id)
  }

  return (
    <>
      <ConfirmDeleteDialog
        title={target.title}
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
      />
      <Card>
        <LinearProgress
          variant='determinate'
          value={timeLeftPercentage}
          sx={{ height: '5px' }}
        />

        <CardHeader
          avatar={
            <CircularProgressWithLabel value={completedTasksPercentage} />
          }
          title={target.title}
          titleTypographyProps={{
            variant: 'subtitle1',
          }}
          subheader={`${target.completedTasks} of ${
            target.totalTasks
          } completed ${status ? '| ' + status : ''}`}
          subheaderTypographyProps={{
            variant: 'caption',
          }}
          action={
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          }
        />

        <Collapse
          in={expanded}
          timeout='auto'
        >
          <Box sx={{ px: 2 }}>
            <TargetItemDurationFace
              start={target.startedDate}
              end={target.dueDate}
            />

            <Typography
              variant='body2'
              sx={{ my: 1 }}
            >
              {target.description}
            </Typography>

            <TasksList
              tasks={target.tasks}
              targetId={target.id}
            />
          </Box>
          <CardActions
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              size='small'
              variant='outlined'
              color='error'
              startIcon={<DeleteIcon />}
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
            <Button
              size='small'
              variant='contained'
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    </>
  )
}

export default TargetItem
