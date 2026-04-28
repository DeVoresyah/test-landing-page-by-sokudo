<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	};

	let { children, size = 'lg', class: className = '' }: Props = $props();

	// DESIGN.md: content max-width 1120–1200px on desktop with responsive
	// gutters of 20 / 32 / 64px. `lg` is the default content width.
	const widths = {
		sm: 'max-w-[44rem]',
		md: 'max-w-[60rem]',
		lg: 'max-w-[75rem]',
		xl: 'max-w-[82rem]'
	} as const;
</script>

<div class="mx-auto w-full px-5 sm:px-8 lg:px-16 {widths[size]} {className}">
	{@render children()}
</div>
