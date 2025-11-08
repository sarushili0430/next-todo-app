import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { TodoService } from "./service/TodoService"
import { HTTPException } from "hono/http-exception"
import { todoSchema } from "@/schemas/todo_schema"
import { ok } from "neverthrow"

const app = new Hono().basePath("/api")

export const route = app
  .get("/", (c) => {
    return c.json({
      message: "Hello, world!",
    })
  })
  .get("/todo/list", async (c) => {
    const todos = await TodoService.getTodos()
    if (todos.isErr()) {
      throw new HTTPException(500, {
        message: "Failed to fetch todos",
      })
    }
    return c.json(
      {
        todos: todos.value,
      },
      200,
    )
  })
  .post("/todo/create", zValidator("json", todoSchema), async (c) => {
    const { title, dueDate, description } = c.req.valid("json")
    const todo = await TodoService.createTodo(title, dueDate, description)
    if (todo.isErr()) {
      throw new HTTPException(500, {
        message: "Failed to create todo",
      })
    }
    return c.json(
      {
        todo: todo.value,
      },
      200,
    )
  })

export type AppType = typeof route
