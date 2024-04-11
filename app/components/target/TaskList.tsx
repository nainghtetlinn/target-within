import { List } from '@mui/material'

import TaskItem from './TaskItem'

import type { TaskType } from '@/types/target'

import { useAppDispatch } from '@/lib/hook'
import { toggleIsCompleteTask } from '@/lib/features/target'

const TaskList = ({
  tasks,
  targetId,
}: {
  tasks: TaskType[]
  targetId: string
}) => {
  const dispatch = useAppDispatch()

  const handleToggle = (taskId: string) => {
    dispatch(toggleIsCompleteTask({ taskId, targetId }))
  }

  return (
    <List
      disablePadding
      dense
    >
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          handleToggle={() => handleToggle(task.id)}
        />
      ))}
    </List>
  )
}

export default TaskList
