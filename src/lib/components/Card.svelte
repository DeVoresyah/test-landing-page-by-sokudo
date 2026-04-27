<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		variant?: 'default' | 'soft' | 'outline' | 'invert';
		padding?: 'sm' | 'md' | 'lg' | 'none';
		interactive?: boolean;
		class?: string;
	};

	let {
		children,
		variant = 'default',
		padding = 'md',
		interactive = false,
		class: className = ''
	}: Props = $props();

	const variants = {
		default: 'border border-neutral-200 bg-white shadow-sm',
		soft: 'border border-transparent bg-neutral-50',
		outline: 'border border-neutral-200 bg-transparent',
		invert: 'border border-white/10 bg-neutral-900 text-neutral-100'
	} as const;

	const paddings = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8 lg:p-10'
	} as const;

	const hover = $derived(
		interactive
			? 'transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md'
			: ''
	);
</script>

<div class="rounded-2xl {variants[variant]} {paddings[padding]} {hover} {className}">
	{@render children()}
</div>
