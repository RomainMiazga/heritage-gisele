import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel'; // On a enlevé le "/serverless" ici

export default defineConfig({
  output: 'server',
  adapter: vercel(),
});