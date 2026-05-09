import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
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
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    category: z.string(),
    thumbnail: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

const pagesCollection = defineCollection({
  type: 'data',
  schema: z.record(z.any()) // Flexible schema for different JSON files
});

export const collections = {
  'blog': blogCollection,
  'portfolio': portfolioCollection,
  'pages': pagesCollection
};
