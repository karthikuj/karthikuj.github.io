import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/data/blog-posts' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		publishDate: z.union([z.string(), z.date()]),
		description: z.string(),
		draft: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
		/** Which part of the site the entry lives in. Writing is served from /blog. */
		section: z.enum(['writing', 'projects', 'research']).default('writing'),
		/** Specimen label: the object the entry studies, and its family. */
		object: z.string().optional(),
		family: z.string().optional(),
		/** Series name and this entry's part number within it. */
		series: z.string().optional(),
		part: z.number().int().positive().optional(),
		/** Plate figure: a sketch id from src/assets/sketches, or an image path under /public. */
		sketch: z.string().optional(),
		hero: z.string().optional(),
		heroAlt: z.string().optional(),
		/** Short caption describing what the plate figure shows. */
		heroCaption: z.string().optional(),
		/** Project write-ups: repository link and primary language. */
		repo: z.string().url().optional(),
		language: z.string().optional(),
	}),
});

export const collections = { posts };
