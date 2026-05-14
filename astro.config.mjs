import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  // Cette ligne est CRUCIALE pour que Vercel accepte tes routes d'API
  output: 'server', 
  adapter: vercel(),
});