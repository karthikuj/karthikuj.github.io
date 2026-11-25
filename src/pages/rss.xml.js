import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { SECTIONS, dateOf, entryUrl, getEntries } from '../lib/entries';

export async function GET(context) {
	const items = await getEntries();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: items.map(({ entry }) => ({
			title: entry.data.title,
			description: entry.data.description,
			pubDate: dateOf(entry),
			link: entryUrl(entry),
			categories: [SECTIONS[entry.data.section].label, ...(entry.data.tags ?? [])],
		})),
	});
}
