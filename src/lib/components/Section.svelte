<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';

	type Props = {
		children: Snippet;
		id?: string;
		tone?: 'default' | 'muted' | 'brand' | 'dark';
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

	const tones = {
		default: 'bg-white text-neutral-900',
		muted: 'bg-neutral-50 text-neutral-900',
		brand: 'bg-primary-50 text-neutral-900',
		dark: 'bg-neutral-900 text-neutral-100'
	} as const;

	const spacings = {
		sm: 'py-12 lg:py-16',
		md: 'py-16 lg:py-24',
		lg: 'py-20 lg:py-32'
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
