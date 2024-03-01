import { z } from 'zod'

export const newTargetInputsSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  dueDate: z.coerce.date().transform(val => val.toISOString()),
  tasks: z
    .object({
      title: z.string().min(1),
    })
    .array(),
})

export type NewTargetType = z.infer<typeof newTargetInputsSchema>
