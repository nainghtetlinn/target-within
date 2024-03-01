import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import { NewTargetType } from '@/validation/target'

export type TaskType = {
  id: string
  targetId: string
  title: string
  isComplete: boolean
}
export type TargetType = {
  id: string
  title: string
  description?: string
  startedDate: Date
  dueDate: Date
  isComplete: boolean
  tasks: string[]
}

type TargetStateType = {
  targets: TargetType[]
  tasks: TaskType[]
}
const initialState: TargetStateType = { targets: [], tasks: [] }

const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    createTarget: (state, action: PayloadAction<NewTargetType>) => {
      const target = action.payload
      console.log(target)
      let targetId = uuid()
      let taskIds: string[] = []

      target?.tasks?.forEach(task => {
        const id = uuid()
        taskIds.push(id)
        state.tasks.push({
          id,
          targetId,
          title: task.title,
          isComplete: false,
        })
      })
      const newTarget: TargetType = {
        id: targetId,
        title: target.title,
        description: target.description,
        startedDate: new Date(),
        dueDate: target.dueDate,
        tasks: taskIds,
        isComplete: false,
      }
      state.targets.push(newTarget)
    },
    toggleIsCompleteTask: (
      state,
      action: PayloadAction<{
        taskId: string
      }>
    ) => {
      state.tasks.map(t => {
        if (t.id === action.payload.taskId) {
          t.isComplete = !t.isComplete
        }
        return t
      })
    },
    updateTargetState: state => {
      state.targets.map(target => {
        const unfinishTasks = state.tasks.filter(
          task => task.targetId === target.id && !task.isComplete
        )
        if (unfinishTasks.length === 0) {
          target.isComplete = true
        }
        return target
      })
    },
  },
})

export const { createTarget, toggleIsCompleteTask, updateTargetState } =
  targetSlice.actions
export default targetSlice.reducer
