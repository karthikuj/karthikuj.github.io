import { getCollection, type CollectionEntry } from 'astro:content';

export type SectionId = 'writing' | 'projects' | 'research';
export type Entry = CollectionEntry<'posts'>;

type SectionInfo = {
	label: string;
	base: string;
	dek: string;
	empty: string;
	/**
	 * Sketch shown beside the index title (public/assets/sketches/<id>/) and its description.
	 * `scale` enlarges an upright sketch so it carries the same weight as the wide ones (default 1).
	 */
	sketch: { id: string; alt: string; scale?: number };
};

export const SECTIONS: Record<SectionId, SectionInfo> = {
	writing: {
		label: 'Writing',
		base: '/blog',
		dek: 'Long-form notes on Windows internals: how objects work, how they are secured, and exercises you can repeat.',
		empty: 'No posts published yet.',
		sketch: { id: 'writing-quill', alt: 'Pencil sketch of a hand in a rolled-up sleeve writing with a feathered quill pen' },
	},
	projects: {
		label: 'Projects',
		base: '/projects',
		dek: 'Tools and repos I have built, with write-ups on how they work.',
		empty: 'No project write-ups published yet. The first one will appear here.',
		sketch: { id: 'projects-hammer', alt: 'Pencil sketch of a hand gripping a claw hammer' },
	},
	research: {
		label: 'Research',
		base: '/research',
		dek: 'Vulnerability research write-ups.',
		empty: 'No research published yet. The first write-up will appear here.',
		sketch: {
			id: 'research-scientist',
			scale: 1.45,
			alt: 'Pencil sketch of a smiling scientist in goggles and a lab coat pouring liquid from a flask into a test tube',
		},
	},
};

export const SECTION_IDS = Object.keys(SECTIONS) as SectionId[];

/** Front-matter dates like "21 June 2026" are calendar dates: read them as UTC so no timezone shifts the day. */
export function toDate(value: string | Date): Date {
	if (value instanceof Date) return value;
	const utc = new Date(`${value} UTC`);
	return Number.isNaN(utc.valueOf()) ? new Date(value) : utc;
}

export function dateOf(entry: Entry): Date {
	return toDate(entry.data.publishDate);
}

export function formatDate(value: string | Date): string {
	const d = toDate(value);
	if (Number.isNaN(d.valueOf())) return String(value);
	return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function entryUrl(entry: Entry): string {
	return `${SECTIONS[entry.data.section].base}/${entry.data.slug}/`;
}

/** Drafts are visible on the dev server (`npm run dev`) so they can be previewed, and never in a build. */
export const SHOW_DRAFTS = import.meta.env.DEV;

/** Published entries for one section (or all), newest first, each with its plate number (oldest = 1). */
export async function getEntries(section?: SectionId) {
	const all = (await getCollection('posts')).filter(
		(p) => (SHOW_DRAFTS || !p.data.draft) && (!section || p.data.section === section),
	);
	const plates = new Map<string, number>();
	for (const id of SECTION_IDS) {
		all
			.filter((p) => p.data.section === id)
			.sort((a, b) => dateOf(a).valueOf() - dateOf(b).valueOf())
			.forEach((p, i) => plates.set(p.id, i + 1));
	}
	return all
		.sort((a, b) => dateOf(b).valueOf() - dateOf(a).valueOf())
		.map((entry) => ({ entry, plate: plates.get(entry.id) ?? 1 }));
}

/** Every part of a series, drafts included, ordered by part number. Drafts are reported but never linked. */
export async function getSeries(series: string) {
	const parts = (await getCollection('posts')).filter((p) => p.data.series === series);
	return parts.sort((a, b) => (a.data.part ?? 0) - (b.data.part ?? 0));
}
