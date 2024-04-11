import { z } from 'zod'

export const newTargetInputsSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  dueDate: z.coerce.date().transform(val => val.toISOString()),
  tasks: z
    .object({
      title: z.string().min(1),
    })
    .array(),
})

export const updateTargetInputsSchema = z.object({
  id: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  startedDate: z.coerce.date().transform(val => val.toISOString()),
  dueDate: z.coerce.date().transform(val => val.toISOString()),
  tasks: z
    .object({
      id: z.string().min(1).max(255).optional(),
      title: z.string().min(1),
      isComplete: z.boolean().optional(),
    })
    .array(),
})
