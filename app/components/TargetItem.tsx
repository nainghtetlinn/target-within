'use client'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Collapse,
  IconButton,
  Button,
  styled,
  Typography,
  LinearProgress,
} from '@mui/material'
import CircularProgressWithLabel from './CircularProgressWithLabel'
import type { IconButtonProps } from '@mui/material'
import type { TargetType } from '@/lib/features/target'

import { useState, useMemo } from 'react'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '@/lib/hook'

import { toggleIsCompleteTask } from '@/lib/features/target'

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
  const { tasks: allTasks } = useAppSelector(store => store.target)

  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const [flag, setFlag] = useState(false)
  const handleIsCompleteTask = (id: string) => {
    dispatch(toggleIsCompleteTask({ taskId: id }))
    setFlag(prev => !prev)
  }

  const tasks = useMemo(() => {
    return allTasks.filter(t => t.targetId === target.id)
  }, [flag])

  const [count, taskPercentage] = useMemo(() => {
    const completedTasksCount = tasks.filter(t => t.isComplete).length
    const percentage = Math.floor((completedTasksCount / tasks.length) * 100)
    return [completedTasksCount, percentage]
  }, [tasks])

  const [status, timeLeftPercentage] = useMemo(() => {
    const start = moment(target.startedDate)
    const end = moment(target.dueDate)
    const now = moment()
    const totalRange = end.diff(start)
    const currentRange = now.diff(start)
    const percentage = 100 - Math.floor((currentRange / totalRange) * 100)
    return [end.fromNow(true), percentage < 0 ? 0 : percentage]
  }, [])

  const subStatus = useMemo(() => {
    if (taskPercentage === 100) return ''
    return timeLeftPercentage === 0
      ? "| Time's up"
      : `| Complete within ${status}`
  }, [status, taskPercentage])

  return (
    <Card raised>
      <Box>
        <LinearProgress
          variant='determinate'
          value={timeLeftPercentage}
          sx={{ height: '5px' }}
        />
      </Box>

      <CardHeader
        avatar={<CircularProgressWithLabel value={taskPercentage} />}
        title={target.title}
        titleTypographyProps={{
          variant: 'subtitle1',
        }}
        subheader={`${count} of ${tasks.length} completed ${subStatus}`}
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
          <Typography variant='body2'>
            Start - {moment(target.startedDate).format('llll')}
          </Typography>
          <Typography variant='body2'>
            End - {moment(target.dueDate).format('llll')}
          </Typography>
          <Typography variant='body2'>
            Duration -{' '}
            {moment
              .duration(
                moment(target.dueDate).diff(target.startedDate),
                'milliseconds'
              )
              .humanize()}
          </Typography>
          <Typography
            variant='body2'
            sx={{ my: 1 }}
          >
            {target.description}
          </Typography>

          <List
            disablePadding
            dense
          >
            {tasks.map(task => (
              <ListItem
                key={task.id}
                disablePadding
              >
                <ListItemButton onClick={() => handleIsCompleteTask(task.id)}>
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={task.isComplete}
                    />
                  </ListItemIcon>
                  <ListItemText primary={task.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
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
          >
            Delete
          </Button>
          <Button
            size='small'
            variant='contained'
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  )
}

export default TargetItem
