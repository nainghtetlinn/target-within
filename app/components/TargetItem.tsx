'use client'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import {
  Box,
  Card,
  CardHeader,
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
} from '@mui/material'
import CircularProgressWithLabel from './CircularProgressWithLabel'
import type { IconButtonProps } from '@mui/material'
import type { TargetType, TaskType } from '@/lib/features/target'

import { useState, useMemo } from 'react'
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

  const completedTasksCount = useMemo(() => {
    return tasks.filter(task => task.isComplete).length
  }, [tasks])

  const completedTasksPercentage = useMemo(() => {
    return (completedTasksCount / tasks.length) * 100
  }, [tasks, completedTasksCount])

  return (
    <Card raised>
      <CardHeader
        avatar={<CircularProgressWithLabel value={completedTasksPercentage} />}
        title={target.title}
        titleTypographyProps={{
          variant: 'subtitle1',
        }}
        subheader={`${completedTasksCount} of ${tasks.length} tasks completed`}
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
        unmountOnExit
      >
        <Box sx={{ px: 2 }}>
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
            variant='contained'
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
