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

	// DESIGN.md: surface fill, subtle border, no inflated shadows. Keeping
	// `soft` / `outline` / `invert` as back-compat variants.
	const variants = {
		default: 'border border-neutral-200 bg-white',
		soft: 'border border-neutral-100 bg-neutral-50',
		outline: 'border border-neutral-200 bg-transparent',
		invert: 'border border-white/10 bg-panel-800 text-neutral-100'
	} as const;

	// DESIGN.md: 24px (`md`) is the canonical card padding.
	const paddings = {
		none: '',
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	} as const;

	const hover = $derived(
		interactive ? 'transition hover:border-primary-300 hover:bg-primary-50/40' : ''
	);
</script>

<div class="rounded-md {variants[variant]} {paddings[padding]} {hover} {className}">
	{@render children()}
</div>
