import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = (await getCollection('posts')).filter((p) => !p.data.draft);
	const sorted = [...posts].sort(
		(a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf(),
	);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: sorted.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: new Date(post.data.publishDate),
			link: `/blog/${post.data.slug}/`,
		})),
	});
}
