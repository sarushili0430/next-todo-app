"use server"
import client from "@/lib/client"
import { Todo } from "@/types/todo"
import { FetchError } from "@/lib/clientError"

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
