import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import type { TaskType } from '@/types/target'

const TaskItem = ({
  task,
  handleToggle,
}: {
  task: TaskType
  handleToggle: () => void
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleToggle}>
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={task.isComplete}
          />
        </ListItemIcon>
        <ListItemText primary={task.title} />
      </ListItemButton>
    </ListItem>
  )
}

export default TaskItem
