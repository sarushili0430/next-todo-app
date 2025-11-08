"use client"

import { TodoList } from "@/app/todos/components/TodoList"
import { FetchError, isFetchError } from "../../lib/clientError"
import { Todo } from "@/types/todo"

export function TodoScreen({ todos }: { todos: Todo[] | FetchError }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">タスク一覧</h1>
      </div>
      {isFetchError(todos) ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">エラー:</strong>
          <span className="block sm:inline">画面をリロードしてください</span>
        </div>
      ) : (
        <TodoList todos={todos} />
      )}
    </div>
  )
}
