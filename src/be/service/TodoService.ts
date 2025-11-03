import { createClient } from "@/utils/supabase/server"
import { ErrorFactory } from "@praha/error-factory"
import { ResultAsync } from "neverthrow"
import { Todo } from "@/types/todo"

class SupabaseError extends ErrorFactory({
  name: "SupabaseError",
  message: "An error occurred with Supabase operations.",
}) {}

class UnexpectedError extends ErrorFactory({
  name: "UnexpectedError",
  message: "An unexpected error occurred.",
}) {}

export const TodoService = {
  getTodos(): ResultAsync<Array<Todo>, SupabaseError> {
    return ResultAsync.fromPromise(
      (async () => {
        const supabase = await createClient()
        const { data } = await supabase.from("todo").select()
        if (data === null) {
          throw new UnexpectedError()
        }
        return data
      })(),
      () => new SupabaseError(),
    ).map((data) =>
      data.map((item) => ({
        id: item.id,
        title: item.title,
        dueDate: item.due_date ? new Date(item.due_date) : undefined,
        description: item.description ?? undefined,
        isCompleted: item.is_completed,
      })),
    )
  },
  createTodo(
    title: string,
    dueDate?: Date,
    description?: string,
  ): ResultAsync<Todo, SupabaseError> {
    return ResultAsync.fromPromise(
      (async () => {
        const supabase = await createClient()
        const { data } = await supabase
          .from("todo")
          .insert({
            title: title,
            due_date: dueDate?.toISOString(),
            description: description,
          })
          .select()
          .single()
        if (data === null) {
          throw new UnexpectedError()
        }
        return data
      })(),
      () => new SupabaseError(),
    ).map((data) => ({
      id: data.id,
      title: data.title,
      dueDate: data.due_date ? new Date(data.due_date) : undefined,
      description: data.description ?? undefined,
      isCompleted: data.is_completed,
    }))
  },
}
