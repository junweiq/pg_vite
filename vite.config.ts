import path from 'node:path'
import fs from 'node:fs'
import {defineConfig, type PluginOption} from 'vite'
import react from '@vitejs/plugin-react'
import {createHtmlPlugin} from "vite-plugin-html";
import { transform } from 'lightningcss'
import * as csstree from 'css-tree'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin(createHtmlPluginConfig()),
    createVitePluginTransformCss(),
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

function createVitePluginTransformCss () {
  const result: PluginOption = {
    name: 'vite-plugin-transform-css',
    enforce: 'pre',
    async configResolved() {
      const css = await fs.promises.readFile(
        path.resolve('.', 'public', 'testvar.css'),
        'utf-8'
      )
      // console.log(css)
      // transform({
      //   code: Buffer.from(css),
      //   visitor: {
      //     EnvironmentVariable: {}
      //   },
      // })
      const ast = csstree.parse(css, {})
      const unoThemes: Record<string, string> = {}
      // console.log(ast)
      csstree.walk(ast, (node) => {
        if (node.type === 'Declaration') {
          const [, colorName] = node.property.match(/^--color-([\w\d_]+)$/) || []
          if (colorName) {
            // if (node.value?.type === 'Raw') console.log(node.value.value.trim())
            unoThemes[colorName] = `var(${node.property})`
          }
        }
      })
      console.log(unoThemes)
    },
  }

  return result
}