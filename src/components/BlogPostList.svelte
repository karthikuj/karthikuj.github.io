<script>
	import { onMount } from 'svelte';

	export let posts = [];
	export let allTags = [];

	function readTagFromUrl() {
		if (typeof window === 'undefined') return null;
		const raw = new URLSearchParams(window.location.search).get('tag');
		return raw && allTags.includes(raw) ? raw : null;
	}

	let selectedTag = readTagFromUrl();

	function syncFromUrl() {
		selectedTag = readTagFromUrl();
	}

	onMount(() => {
		window.addEventListener('popstate', syncFromUrl);
		document.addEventListener('astro:page-load', syncFromUrl);
		return () => {
			window.removeEventListener('popstate', syncFromUrl);
			document.removeEventListener('astro:page-load', syncFromUrl);
		};
	});

	$: filtered =
		selectedTag ? posts.filter((p) => (p.tags ?? []).includes(selectedTag)) : posts;
</script>

<div class="tag-filters-bar" role="navigation" aria-label="Filter posts by tag">
	<span class="tag-filters__label">Tags</span>
	<ul class="tag-filters">
		<li>
			<a href="/blog" class:is-active={!selectedTag}>All</a>
		</li>
		{#each allTags as tag}
			<li>
				<a href={`/blog?tag=${encodeURIComponent(tag)}`} class:is-active={selectedTag === tag}>{tag}</a>
			</li>
		{/each}
	</ul>
</div>

<section id="blog-post-list">
	{#if filtered.length === 0}
		<p class="empty-filter">No posts with this tag yet.</p>
	{:else}
		{#each filtered as post, index}
			<div>
				{#if index !== 0}
					<hr />
				{/if}
				<div class="post-item">
					<h2>
						<a href={`/blog/${post.slug}`}>{post.title}</a>
					</h2>
					<p>{post.description}</p>
					{#if (post.tags?.length ?? 0) > 0}
						<div class="card-tags">
							{#each post.tags as tag}
								<a href={`/blog?tag=${encodeURIComponent(tag)}`}>{tag}</a>
							{/each}
						</div>
					{/if}
					<div class="post-item-footer">
						<span class="post-item-date">— {post.publishDate}</span>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</section>

<style>
	h2,
	.post-item-footer {
		font-family: var(--font-family-sans);
		font-weight: 700;
	}

	.post-item-date {
		color: var(--text-secondary);
		text-align: left;
		text-transform: uppercase;
		margin-right: 16px;
	}

	hr {
		margin: 60px auto;
	}

	.tag-filters-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.tag-filters__label {
		font-size: 0.85em;
		font-weight: 700;
		font-family: var(--font-family-sans);
		color: var(--text-secondary);
		margin-right: 0.25rem;
		text-transform: uppercase;
	}

	.tag-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tag-filters a {
		display: inline-block;
		font-size: 0.85em;
		font-weight: 600;
		font-family: var(--font-family-sans);
		padding: 0.35em 0.75em;
		border-radius: 999px;
		text-decoration: none;
		color: var(--text-main);
		background: transparent;
		border: 1px solid var(--text-secondary);
		transition:
			border-color 0.15s ease,
			color 0.15s ease;
	}

	.tag-filters a:hover {
		border-color: var(--primary-color);
		color: var(--primary-color);
	}

	.tag-filters a.is-active {
		border-color: var(--primary-color);
		color: var(--primary-color);
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0.75rem 0 0.5rem;
	}

	.card-tags a {
		display: inline-block;
		font-size: 0.75em;
		font-weight: 600;
		font-family: var(--font-family-sans);
		padding: 0.15em 0.55em;
		border-radius: 999px;
		text-decoration: none;
		color: var(--text-main);
		border: 1px solid var(--text-secondary);
	}

	.card-tags a:hover {
		border-color: var(--primary-color);
		color: var(--primary-color);
	}

	.empty-filter {
		color: var(--text-secondary);
		font-size: 1.1rem;
	}
</style>
