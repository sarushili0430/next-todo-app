"use client"

import { TodoList } from "@/app/todos/components/TodoList"
import { FetchError, isFetchError } from "../../lib/clientError"
import { Todo } from "@/types/todo"
import { CreateTodoDialog } from "./components/CreateTodoDialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

export function TodoScreen({ todos }: { todos: Todo[] | FetchError }) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [todoList, setTodoList] = useState<Todo[]>(
    isFetchError(todos) ? [] : todos,
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">タスク一覧</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          新しいタスクを作成
        </Button>
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
        <TodoList todos={todoList} setTodoList={setTodoList} />
      )}

      <CreateTodoDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  )
}
