<script>
	import { onMount } from 'svelte';

	/** Full list; narrowed by ?tag= on the client (static builds have no query at build time). */
	export let allPosts = [];
	export let allTags = [];
	export let listId = 'blog-post-list';

	let FuseCtor = null;
	let query = '';

	function readTagFromUrl() {
		if (typeof window === 'undefined') return null;
		const raw = new URLSearchParams(window.location.search).get('tag');
		return raw && allTags.includes(raw) ? raw : null;
	}

	let urlTag = readTagFromUrl();

	function syncUrlTag() {
		urlTag = readTagFromUrl();
	}

	onMount(async () => {
		const mod = await import('fuse.js');
		FuseCtor = mod.default;

		window.addEventListener('popstate', syncUrlTag);
		document.addEventListener('astro:page-load', syncUrlTag);
		return () => {
			window.removeEventListener('popstate', syncUrlTag);
			document.removeEventListener('astro:page-load', syncUrlTag);
		};
	});

	$: posts = urlTag ? allPosts.filter((p) => (p.tags ?? []).includes(urlTag)) : allPosts;

	$: fuse =
		FuseCtor && posts.length > 0
			? new FuseCtor(posts, {
					keys: ['title', 'tags', 'description'],
					threshold: 0.32,
					ignoreLocation: true,
				})
			: null;

	$: trimmed = query.trim();
	$: results = trimmed && fuse ? fuse.search(trimmed) : [];

	$: {
		if (typeof document !== 'undefined') {
			const el = document.getElementById(listId);
			if (el) el.style.display = trimmed ? 'none' : '';
		}
	}
</script>

<div class="blog-search">
	<label class="blog-search__label" for="blog-search-input">Search posts</label>
	<input
		id="blog-search-input"
		class="blog-search__input"
		type="search"
		placeholder="Search by title, tags, or description…"
		autocomplete="off"
		bind:value={query}
	/>
	{#if trimmed}
		<ul class="blog-search__results" aria-live="polite">
			{#if results.length === 0}
				<li class="blog-search__empty">No posts match that search.</li>
			{:else}
				{#each results as { item }}
					<li>
						<a href={`/blog/${item.slug}`} class="blog-search__result-link" data-astro-reload>
							<span class="blog-search__result-title">{item.title}</span>
							{#if item.description}
								<span class="blog-search__result-desc">{item.description}</span>
							{/if}
						</a>
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>

<style>
	.blog-search {
		margin-bottom: 1.75rem;
	}

	.blog-search__label {
		display: block;
		font-size: 0.85em;
		font-weight: 700;
		font-family: var(--font-family-sans);
		color: var(--text-secondary);
		margin-bottom: 0.35rem;
		text-transform: uppercase;
	}

	.blog-search__input {
		width: 100%;
		box-sizing: border-box;
		padding: 0.55em 0.75em;
		border: 1px solid var(--text-secondary);
		border-radius: 8px;
		background: var(--background-body);
		color: var(--text-main);
		font: inherit;
	}

	.blog-search__input:focus {
		outline: 2px solid var(--primary-color);
		outline-offset: 2px;
	}

	.blog-search__results {
		list-style: none;
		margin: 1rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.blog-search__empty {
		color: var(--text-secondary);
		font-size: 0.95em;
	}

	.blog-search__result-link {
		display: block;
		text-decoration: none;
		padding: 0.65rem 0.85em;
		border-radius: 10px;
		border: 1px solid var(--text-secondary);
		background: var(--background-body);
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.blog-search__result-link:hover {
		border-color: var(--primary-color);
	}

	.blog-search__result-title {
		display: block;
		font-weight: 700;
		font-family: var(--font-family-sans);
		color: var(--text-main);
		margin-bottom: 0.2rem;
	}

	.blog-search__result-desc {
		display: block;
		font-size: 0.88em;
		color: var(--text-secondary);
		line-height: 1.45;
	}
</style>
