import { z } from "zod"

export const todoSchema = z
  .object({
    title: z.string(),
    dueDate: z.iso.date().optional(),
    description: z.string().optional(),
  })
  .refine((data) => {
    return data?.dueDate ? new Date(data?.dueDate) > new Date() : true
  })
