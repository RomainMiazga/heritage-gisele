import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // Import de l'adaptateur

export default defineConfig({
  output: 'server', // FORCE LE MODE SERVEUR (Indispensable pour l'API)
  adapter: vercel(), // DIT À ASTRO D'UTILISER VERCEL
});