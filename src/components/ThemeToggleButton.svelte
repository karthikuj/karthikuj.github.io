<script>
	import { onMount } from 'svelte';

	let dark = false;

	onMount(() => {
		dark = document.documentElement.classList.contains('theme-dark');
	});

	function toggle() {
		dark = !dark;
		document.documentElement.classList.toggle('theme-dark', dark);
		try {
			localStorage.setItem('theme', dark ? 'dark' : 'light');
		} catch (e) {
			/* storage blocked: the choice lasts for this page only */
		}
	}
</script>

<button
	type="button"
	class="theme-toggle"
	aria-pressed={dark}
	aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
	title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
	on:click={toggle}
>
	{#if dark}
		<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
			<circle cx="10" cy="10" r="3.6" />
			<path d="M10 2.2v1.6M10 16.2v1.6M2.2 10h1.6M16.2 10h1.6M4.5 4.5l1.1 1.1M14.4 14.4l1.1 1.1M4.5 15.5l1.1-1.1M14.4 5.6l1.1-1.1" />
		</svg>
	{:else}
		<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
			<path d="M16.4 12.6A7 7 0 0 1 7.4 3.6a7 7 0 1 0 9 9Z" />
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		display: inline-grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 1px solid var(--rule);
		border-radius: 4px;
		background: transparent;
		color: var(--ink-soft);
		cursor: pointer;
		flex: none;
		transition: border-color 0.15s ease, color 0.15s ease;
	}

	.theme-toggle:hover {
		border-color: var(--rule-strong);
		color: var(--ink);
	}
</style>
