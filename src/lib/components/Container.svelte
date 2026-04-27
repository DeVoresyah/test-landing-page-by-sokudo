<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	};

	let { children, size = 'lg', class: className = '' }: Props = $props();

	const widths = {
		sm: 'max-w-3xl',
		md: 'max-w-5xl',
		lg: 'max-w-7xl',
		xl: 'max-w-[88rem]'
	} as const;
</script>

<div class="mx-auto w-full px-6 lg:px-8 {widths[size]} {className}">
	{@render children()}
</div>
