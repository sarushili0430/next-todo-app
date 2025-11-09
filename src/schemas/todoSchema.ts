import { z } from "zod"

export const todoSchema = z
  .object({
    title: z.string().min(1, "タイトルは必須です"),
    dueDate: z.string().optional(),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data?.dueDate) return true
      return new Date(data.dueDate) > new Date()
    },
    {
      message: "期限は未来の日付を設定してください",
      path: ["dueDate"],
    },
  )
