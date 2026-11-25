import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import rehypeFieldGuide from './src/lib/rehype-field-guide.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://karthikuj.github.io',
	devToolbar: { enabled: false },
	integrations: [mdx(), svelte(), sitemap()],
	vite: {
		optimizeDeps: {
			include: ['fuse.js'],
		},
	},
	markdown: {
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark-dimmed',
			},
			defaultColor: false,
		},
		remarkPlugins: [remarkGfm, remarkSmartypants],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['noopener', 'noreferrer'],
				},
			],
			rehypeFieldGuide,
		],
	},
});
