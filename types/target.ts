import { z } from 'zod'
import {
  newTargetInputsSchema,
  updateTargetInputsSchema,
} from '@/validation/target'

export type NewTargetType = z.infer<typeof newTargetInputsSchema>
export type UpdateTargetType = z.infer<typeof updateTargetInputsSchema>

export type TaskType = {
  id: string
  title: string
  isComplete: boolean
}

export type TargetType = {
  id: string
  title: string
  description?: string
  startedDate: string
  dueDate: string
  totalTasks: number
  completedTasks: number
  tasks: TaskType[]
}
