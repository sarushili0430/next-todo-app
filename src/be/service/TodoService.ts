import { createClient } from "@/utils/supabase/server"
import { ErrorFactory } from "@praha/error-factory"
import { ResultAsync } from "neverthrow"

type Todo = {
  id: number
  title: string
  dueDate?: Date
  description?: string
  isCompleted: boolean
}

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
        const { data } = await supabase.from("todo").select("*")
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
}
