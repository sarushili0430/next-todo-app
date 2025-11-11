import { hc } from "hono/client"
import type { AppType } from "@/be"

const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL as string)

export default client
