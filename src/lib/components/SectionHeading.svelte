<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		eyebrow?: string;
		title: string;
		description?: string;
		align?: 'left' | 'center';
		tone?: 'default' | 'invert';
		children?: Snippet;
		class?: string;
	};

	let {
		eyebrow,
		title,
		description,
		align = 'left',
		tone = 'default',
		children,
		class: className = ''
	}: Props = $props();

	const wrapperAlign = $derived(
		align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'
	);
	// DESIGN.md: muted body, brand-tinted eyebrow on light surfaces; soft
	// neutrals on inverted (panel) surfaces.
	const titleColor = $derived(tone === 'invert' ? 'text-white' : 'text-neutral-900');
	const descColor = $derived(tone === 'invert' ? 'text-neutral-300' : 'text-neutral-600');
	const eyebrowColor = $derived(tone === 'invert' ? 'text-primary-200' : 'text-primary-700');
</script>

<div class="flex max-w-2xl flex-col gap-3 {wrapperAlign} {className}">
	{#if eyebrow}
		<span
			class="text-xs font-semibold tracking-[0.18em] uppercase {eyebrowColor}"
		>
			{eyebrow}
		</span>
	{/if}
	<h2 class="text-balance text-3xl font-bold tracking-tight sm:text-4xl {titleColor}">
		{title}
	</h2>
	{#if description}
		<p class="text-pretty text-base leading-relaxed {descColor}">
			{description}
		</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>
