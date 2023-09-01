/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ["./src", "./__tests__"],
    exclude: ["./node_modules", "./dist", "./server"]
  },
})