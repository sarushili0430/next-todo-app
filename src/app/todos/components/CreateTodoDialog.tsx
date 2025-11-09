"use client"

import { useState } from "react"
import { getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { todoSchema } from "@/schemas/todoSchema"
import { createTodo } from "../actions"
import { useActionState } from "react"

interface CreateTodoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTodoDialog({
  open,
  onOpenChange,
}: CreateTodoDialogProps) {
  const handleAction = async (prevState: unknown, formData: FormData) => {
    const result = await createTodo(prevState, formData)
    if (result.status === "success") {
      onOpenChange(false)
      window.location.reload()
    }
    return result
  }

  const [lastResult, action, pending] = useActionState(handleAction, undefined)

  const [form, fields] = useForm({
    lastResult: lastResult?.submission,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: todoSchema,
      })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新しいタスクを作成</DialogTitle>
        </DialogHeader>

        {/* {...getInputProps(fields.password, { type: "password" })}
              key={fields.password.key} */}

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor={fields.title.id}>タイトル *</Label>
              <Input
                {...getInputProps(fields.title, { type: "text" })}
                key={fields.title.key}
                placeholder="タスクのタイトルを入力"
              />
              {fields.title.errors && (
                <p className="text-sm text-destructive">
                  {fields.title.errors}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor={fields.description.id}>説明</Label>
              <Textarea
                {...getInputProps(fields.description, { type: "text" })}
                key={fields.description.key}
                placeholder="タスクの詳細を入力（任意）"
                rows={3}
              />
              {fields.description.errors && (
                <p className="text-sm text-destructive">
                  {fields.description.errors}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor={fields.dueDate.id}>期限</Label>
              <Input
                {...getInputProps(fields.dueDate, { type: "date" })}
                key={fields.dueDate.key}
                type="datetime-local"
              />
              {fields.dueDate.errors && (
                <p className="text-sm text-destructive">
                  {fields.dueDate.errors}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending || !form.dirty}>
              {pending ? "作成中..." : "作成"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
