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

// Current work lives in src/content/projects/work.json.
// Add a project under the right group; leave url off when there is no public site.
const projects = defineCollection({
    type: 'data',
    schema: z.object({
        groups: z.array(
            z.object({
                id: z.string(),
                title: z.string(),
                summary: z.string(),
                projects: z.array(
                    z.object({
                        name: z.string(),
                        description: z.string(),
                        role: z.string(),
                        url: z.string().url().optional(),
                        location: z.string().optional(),
                        tags: z.array(z.string()).default([]),
                        logo: z.string().optional(),
                        logoWide: z.boolean().default(false),
                        mark: z.string().optional(),
                    })
                ),
            })
        ),
    }),
});

export const collections = { blog, now, projects };
