import { z } from "zod"

export const todoSchema = z.object({
  title: z.string(),
  dueDate: z.date().optional(),
  description: z.string().optional(),
})
