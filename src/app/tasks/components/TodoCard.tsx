"use client"

import { useState } from "react"
import { Todo } from "@/types/todo"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock } from "lucide-react"

interface TodoCardProps {
  todo: Todo
}

export function TodoCard({ todo: initialTodo }: TodoCardProps) {
  const [todo, setTodo] = useState(initialTodo)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isOverdue = (dueDate: Date) => {
    return new Date(dueDate) < new Date()
  }

  const handleToggleComplete = (checked: boolean) => {
    setTodo((prev) => ({ ...prev, isCompleted: checked }))
  }

  return (
    <Card
      className={`transition-all hover:shadow-md ${
        todo.isCompleted ? "bg-muted/30" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={todo.isCompleted}
              onCheckedChange={handleToggleComplete}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-semibold leading-tight ${
                  todo.isCompleted
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`mt-1 text-sm ${
                    todo.isCompleted
                      ? "text-muted-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {todo.description}
                </p>
              )}
            </div>
          </div>

          <Badge
            variant={todo.isCompleted ? "secondary" : "default"}
            className="ml-4 shrink-0"
          >
            {todo.isCompleted ? "完了" : "未完了"}
          </Badge>
        </div>
      </CardHeader>

      {todo.dueDate && (
        <CardContent className="pt-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span
              className={`text-sm ${
                todo.isCompleted
                  ? "text-muted-foreground"
                  : isOverdue(todo.dueDate)
                    ? "text-destructive font-medium"
                    : "text-muted-foreground"
              }`}
            >
              期限: {formatDate(todo.dueDate)}
            </span>
            {!todo.isCompleted && isOverdue(todo.dueDate) && (
              <Badge variant="destructive" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                期限切れ
              </Badge>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
