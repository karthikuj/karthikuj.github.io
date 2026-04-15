import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';

// https://astro.build/config
export default defineConfig({
	site: 'https://karthikuj.github.io',
	integrations: [mdx(), svelte(), sitemap()],
	vite: {
		optimizeDeps: {
			include: ['fuse.js'],
		},
	},
	markdown: {
		shikiConfig: {
			theme: 'nord',
		},
		remarkPlugins: [remarkGfm, remarkSmartypants],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
				},
			],
		],
	},
});
