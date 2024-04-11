import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import type { PayloadAction } from '@reduxjs/toolkit'

import type {
  TargetType,
  TaskType,
  NewTargetType,
  UpdateTargetType,
} from '@/types/target'

type TargetStateType = {
  targets: TargetType[]
}

let localTargets
if (typeof window !== 'undefined') {
  localTargets = localStorage.getItem('targets')
}

const parsedTargets = localTargets ? JSON.parse(localTargets) : []

const initialState: TargetStateType = {
  targets: parsedTargets,
}

const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    createTarget: (state, action: PayloadAction<NewTargetType>) => {
      const target = action.payload

      let tasks: TaskType[] = []

      target?.tasks?.forEach(task => {
        tasks.push({
          id: uuid(),
          title: task.title,
          isComplete: false,
        })
      })
      const newTarget: TargetType = {
        id: uuid(),
        title: target.title,
        description: target.description,
        startedDate: new Date().toISOString(),
        dueDate: target.dueDate,
        totalTasks: tasks.length,
        completedTasks: 0,
        tasks,
      }
      state.targets.push(newTarget)
      localStorage.setItem('targets', JSON.stringify(state.targets))
    },

    updateTarget: (state, action: PayloadAction<UpdateTargetType>) => {
      const target = action.payload

      let tasks: TaskType[] = []
      let completedTasks = 0

      target?.tasks?.forEach(task => {
        if (task.id) {
          tasks.push({
            id: task.id,
            title: task.title,
            isComplete: !!task.isComplete,
          })
          if (!!task.isComplete) completedTasks++
        } else
          tasks.push({
            id: uuid(),
            title: task.title,
            isComplete: false,
          })
      })

      const updatedTarget: TargetType = {
        id: target.id,
        title: target.title,
        description: target.description,
        startedDate: target.startedDate,
        dueDate: target.dueDate,
        totalTasks: tasks.length,
        completedTasks,
        tasks,
      }

      state.targets = state.targets.map(t => {
        if (t.id === target.id) return updatedTarget
        return t
      })

      localStorage.setItem('targets', JSON.stringify(state.targets))
    },

    deleteTarget: (state, action: PayloadAction<{ targetId: string }>) => {
      state.targets = state.targets.filter(
        target => target.id !== action.payload.targetId
      )

      localStorage.setItem('targets', JSON.stringify(state.targets))
    },

    toggleIsCompleteTask: (
      state,
      action: PayloadAction<{
        targetId: string
        taskId: string
      }>
    ) => {
      const { targetId, taskId } = action.payload

      state.targets = state.targets.map(target => {
        // looping each target
        if (target.id === targetId) {
          target.tasks.map(task => {
            // looping each task
            if (task.id === taskId) {
              if (task.isComplete) {
                task.isComplete = false
                target.completedTasks--
              } else {
                task.isComplete = true
                target.completedTasks++
              }
            }
            return task
          })
        }
        return target
      })

      localStorage.setItem('targets', JSON.stringify(state.targets))
    },
  },
})

export const {
  createTarget,
  updateTarget,
  deleteTarget,
  toggleIsCompleteTask,
} = targetSlice.actions
export default targetSlice.reducer
