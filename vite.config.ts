import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {createHtmlPlugin} from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin(createHtmlPluginConfig())
  ],
})

function createHtmlPluginConfig () {
  type UserOptions = typeof createHtmlPlugin extends (options?: infer O) => any ? O : never;
  const config: UserOptions = {
    minify: true,
    pages: [
      {
        entry: 'src/main.tsx',
        filename: 'index.html',
        template: 'index.html',
        injectOptions: {
          data: {
            title: 'index',
          },
        },
      },
      {
        entry: 'src/main.tsx',
        filename: 'other.html',
        template: 'other.html',
        injectOptions: {
          data: {
            title: 'other page',
          },
        },
      },
    ],
  }

  return config
}