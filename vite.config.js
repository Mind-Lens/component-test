import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LitComponents',
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
      }
    },
  },
})