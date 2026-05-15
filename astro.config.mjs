import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // REMPLACE PAR TON URL RÉELLE (ex: https://lheritagedegisele.fr)
  site: 'https://heritage-gisele.vercel.app', 
  
  output: 'server',
  adapter: vercel(),
  
  // Optionnel : si tu veux forcer le trailing slash pour le SEO
  trailingSlash: 'always',
});