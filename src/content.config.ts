import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    author: z.string().default('Equipe Filomena'),
    date: z.string().or(z.date()),
    category: z.string(),
    thumbnail: z.string().optional(),
    description: z.string()
  })
});

const portfolioCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    category: z.string(),
    behance_id: z.string(),
    thumbnail: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: z.record(z.any()) // Flexible schema for different JSON files
});

export const collections = {
  'blog': blogCollection,
  'portfolio': portfolioCollection,
  'pages': pagesCollection
};
