// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkFixWordPaste from './src/plugins/remark-fix-word-paste.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.filomenapropaganda.com.br',
  integrations: [sitemap()],
  prefetch: true,
  markdown: {
    remarkPlugins: [remarkFixWordPaste],
  },
});
