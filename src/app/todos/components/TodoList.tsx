"use client"

import { useState } from "react"
import { Todo } from "@/types/todo"
import { TodoCard } from "@/app/todos/components/TodoCard"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight } from "lucide-react"

interface TodoListProps {
  todos: Todo[]
  setTodoList: (todos: Todo[]) => void
}

export function TodoList({ todos }: TodoListProps) {
  const [isCompletedOpen, setIsCompletedOpen] = useState(false)

  const pendingTodos = todos.filter((todo) => !todo.isCompleted)
  const completedTodos = todos.filter((todo) => todo.isCompleted)

  return (
    <div className="space-y-8">
      {/* Pending Tasks */}
      {pendingTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            未完了のタスク ({pendingTodos.length})
          </h2>
          <div className="space-y-4">
            {pendingTodos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks - Collapsible */}
      {completedTodos.length > 0 && (
        <Collapsible open={isCompletedOpen} onOpenChange={setIsCompletedOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-foreground/80 transition-colors mb-4">
            {isCompletedOpen ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
            完了済みのタスク ({completedTodos.length})
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            {completedTodos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}
