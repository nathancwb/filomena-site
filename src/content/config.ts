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

const pagesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    marcas: z.string(),
    anos: z.string(),
    alcance: z.string()
  })
});

export const collections = {
  'blog': blogCollection,
  'pages': pagesCollection
};
