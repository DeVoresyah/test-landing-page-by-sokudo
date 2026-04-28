<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';

	type Props = {
		children: Snippet;
		id?: string;
		tone?: 'default' | 'muted' | 'panel' | 'brand' | 'dark';
		size?: 'sm' | 'md' | 'lg' | 'xl';
		spacing?: 'sm' | 'md' | 'lg';
		bare?: boolean;
		class?: string;
	};

	let {
		children,
		id,
		tone = 'default',
		size = 'lg',
		spacing = 'md',
		bare = false,
		class: className = ''
	}: Props = $props();

	// DESIGN.md: three canonical surfaces — white / muted / charcoal panel.
	// `brand` and `dark` are kept for back-compat and map onto the new set.
	const tones = {
		default: 'bg-white text-neutral-900',
		muted: 'bg-neutral-50 text-neutral-900',
		panel: 'panel-grain bg-panel-900 text-neutral-100',
		brand: 'bg-primary-50 text-neutral-900',
		dark: 'panel-grain bg-panel-900 text-neutral-100'
	} as const;

	// DESIGN.md: 40px mobile / 72px desktop vertical rhythm on the default
	// (`md`) cadence. `sm` and `lg` step in/out for tighter or hero-style blocks.
	const spacings = {
		sm: 'py-8 lg:py-12',
		md: 'py-10 lg:py-18',
		lg: 'py-12 lg:py-20'
	} as const;
</script>

<section {id} class="{tones[tone]} {spacings[spacing]} {className}">
	{#if bare}
		{@render children()}
	{:else}
		<Container {size}>
			{@render children()}
		</Container>
	{/if}
</section>
