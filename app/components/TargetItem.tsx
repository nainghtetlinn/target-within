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

import { useState } from 'react'
import { useAppDispatch } from '@/lib/hook'

import { toggleIsCompleteTask, updateTargetState } from '@/lib/features/target'

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

const TargetItem = ({
  target,
  tasks,
}: {
  target: TargetType
  tasks: TaskType[]
}) => {
  const dispatch = useAppDispatch()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleIsCompleteTask = (id: string) => {
    dispatch(toggleIsCompleteTask({ taskId: id }))
    dispatch(updateTargetState())
  }

  return (
    <Card raised>
      <CardHeader
        avatar={
          <CircularProgressWithLabel value={target.completedPercentage} />
        }
        title={target.title}
        subheader={target.description}
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
            variant='contained'
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
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
