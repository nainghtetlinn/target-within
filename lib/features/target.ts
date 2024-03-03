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
  startedDate: string
  dueDate: string
}

type TargetStateType = {
  targets: TargetType[]
  tasks: TaskType[]
}
const initialState: TargetStateType = {
  targets: [
    {
      id: '2dce512c-0346-4e38-a85d-771175e05a7e',
      title: 'Title',
      description: 'Hello',
      startedDate: '2024-03-01T15:01:22.021Z',
      dueDate: '2024-03-06T15:01:04.000Z',
    },
    {
      id: '2b720386-b0d8-42b7-9d92-64129030442f',
      title: 'g',
      description: '',
      startedDate: '2024-03-01T16:38:16.970Z',
      dueDate: '2024-03-30T16:38:06.000Z',
    },
    {
      id: 'ced7a821-f260-47d6-86b0-6e6a4d697b6d',
      title: 'c',
      description: '',
      startedDate: '2024-03-01T16:38:30.826Z',
      dueDate: '2024-03-27T16:38:06.000Z',
    },
  ],
  tasks: [
    {
      id: '6f5a7221-8dd7-4323-ac4d-bab3f15893d1',
      targetId: '2dce512c-0346-4e38-a85d-771175e05a7e',
      title: 'Hello',
      isComplete: false,
    },
    {
      id: '32784c5d-8e5c-467d-badf-b9efbb746d39',
      targetId: '2dce512c-0346-4e38-a85d-771175e05a7e',
      title: 'World',
      isComplete: false,
    },
    {
      id: 'f5176dd2-5462-47d2-9620-642161149cd2',
      targetId: '2b720386-b0d8-42b7-9d92-64129030442f',
      title: 'hello',
      isComplete: false,
    },
    {
      id: 'df24b234-5b08-4317-b57b-734017bcd90d',
      targetId: 'ced7a821-f260-47d6-86b0-6e6a4d697b6d',
      title: 'hello',
      isComplete: false,
    },
    {
      id: '3bf8a4c9-80b0-4807-add4-08bba623ccbd',
      targetId: 'ced7a821-f260-47d6-86b0-6e6a4d697b6d',
      title: 'afsad',
      isComplete: false,
    },
  ],
}

const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    createTarget: (state, action: PayloadAction<NewTargetType>) => {
      const target = action.payload

      let targetId = uuid()

      target?.tasks?.forEach(task => {
        state.tasks.push({
          id: uuid(),
          targetId,
          title: task.title,
          isComplete: false,
        })
      })
      const newTarget: TargetType = {
        id: targetId,
        title: target.title,
        description: target.description,
        startedDate: new Date().toISOString(),
        dueDate: target.dueDate,
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
    // updateTargetState: state => {
    //   state.targets.map(target => {
    //     const tasks = state.tasks.filter(task => task.targetId === target.id)

    //     if (tasks.length > 0) {
    //       const finishedTasks = tasks.filter(task => task.isComplete)

    //       if (finishedTasks.length === tasks.length) {
    //         target.isComplete = true
    //       }

    //       const finishedTasksPercentage =
    //         (finishedTasks.length / tasks.length) * 100

    //       target.completedPercentage = finishedTasksPercentage
    //     }

    //     return target
    //   })
    // },
  },
})

export const { createTarget, toggleIsCompleteTask } = targetSlice.actions
export default targetSlice.reducer
