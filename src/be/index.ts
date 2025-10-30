import { Hono } from "hono"

const app = new Hono().basePath("/api")

export const route = app
  .get("/", (c) => {
    return c.json({
      message: "Hello, world!",
    })
  })
  .post("/create", async (c) => {})
