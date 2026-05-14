import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // Nouveau : on importe le loader

const creations = defineCollection({
  // Nouveau : on définit comment charger les fichiers
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/creations" }),
  schema: z.object({
    id: z.string(),
    nom: z.string(),
    description: z.string(),
    prix: z.number(),
    image_url: z.string(),
    stock: z.number(),
  }),
});

export const collections = { creations };