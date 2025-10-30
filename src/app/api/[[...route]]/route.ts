import { handle } from "hono/vercel"
import { route } from "@/be/index"

export const GET = handle(route)
export const POST = handle(route)
