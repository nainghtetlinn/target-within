import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

type TaskType = {
  id: string
  targetId: string
  title: string
  isComplete: boolean
}
type TargetType = {
  id: string
  title: string
  description?: string
  startedDate: Date
  dueDate: Date
  isComplete: boolean
  tasks: string[]
}
type NewTargetType = {
  title: string
  description?: string
  startedDate: Date
  dueDate: Date
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
    createTarget: (
      state,
      action: PayloadAction<{
        target: NewTargetType
        tasks: string[]
      }>
    ) => {
      let targetId = uuid()
      let taskIds: string[] = []

      const newTasks: TaskType[] = action.payload.tasks.map(t => {
        const id = uuid()
        taskIds.push(id)
        return {
          id,
          targetId,
          title: t,
          isComplete: false,
        }
      })
      const newTarget: TargetType = {
        ...action.payload.target,
        id: targetId,
        isComplete: false,
        tasks: taskIds,
      }

      state.targets.push(newTarget)
      state.tasks = [...state.tasks, ...newTasks]

      return state
    },
  },
})

export const { createTarget } = targetSlice.actions
export default targetSlice.reducer
