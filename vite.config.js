import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  plugins: [
    // MDX must run before the React plugin (enforce: 'pre').
    // Frontmatter (--- yaml ---) is parsed and re-exported as `frontmatter`.
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    // Let the React plugin also process compiled .mdx (JSX runtime + refresh).
    react({ include: /\.(jsx|js|mdx|md)$/ }),
  ],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
  },
})
