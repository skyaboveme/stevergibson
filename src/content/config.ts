import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        heroImage: z.string().optional(),
        author: z.string().default('Steve R Gibson'),
    }),
});

const now = defineCollection({
    type: 'data',
    schema: z.object({
        updatedAt: z.string(),
        focus_items: z.array(
            z.object({
                emoji: z.string(),
                title: z.string(),
                description: z.string(),
            })
        ),
    }),
});

export const collections = { blog, now };
