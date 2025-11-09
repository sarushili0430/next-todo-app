"use server"
import client from "@/lib/client"
import { Todo } from "@/types/todo"
import { FetchError } from "@/lib/clientError"
import { parseWithZod } from "@conform-to/zod/v4"
import { todoSchema } from "@/schemas/todoSchema"

export async function fetchTodos(): Promise<Todo[] | FetchError> {
  const result = await client.api.todo.list.$get()

  if (!result.ok) {
    return new FetchError()
  }

  const { todos } = await result.json()
  return todos.map((todo) => ({
    ...todo,
    dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
  })) as Todo[]
}

export async function createTodo(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: todoSchema,
  })
  if (submission.status !== "success") {
    return { status: "error", submission: submission.reply() }
  }

  const { title, dueDate, description } = submission.value

  const result = await client.api.todo.create.$post({
    json: {
      title,
      dueDate,
      description,
    },
  })

  if (!result.ok) {
    return {
      status: "error",
      submission: submission.reply({
        formErrors: ["タスクの作成に失敗しました。再度お試しください"],
      }),
    }
  }

  //const { todo } = await result.json()

  return { status: "success", submission: submission.reply() }
}
