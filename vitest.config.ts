import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    globals: true,
    include: ["**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@/": path.resolve(__dirname),
    },
  },
})
