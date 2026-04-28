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
	const titleColor = $derived(tone === 'invert' ? 'text-white' : 'text-neutral-900');
	const descColor = $derived(tone === 'invert' ? 'text-neutral-300' : 'text-neutral-600');
	const eyebrowStyle = $derived(
		tone === 'invert'
			? 'border-white/20 bg-white/10 text-primary-200'
			: 'border-primary-200 bg-primary-50 text-primary-700'
	);
</script>

<div class="flex max-w-3xl flex-col gap-4 {wrapperAlign} {className}">
	{#if eyebrow}
		<span
			class="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider {eyebrowStyle}"
		>
			<span class="size-1.5 rounded-full bg-primary-500"></span>
			{eyebrow}
		</span>
	{/if}
	<h2 class="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl {titleColor}">
		{title}
	</h2>
	{#if description}
		<p class="text-pretty text-base leading-relaxed sm:text-lg {descColor}">
			{description}
		</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>
