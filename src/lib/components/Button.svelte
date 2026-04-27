<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'ghost';
	type Size = 'sm' | 'md' | 'lg';

	type CommonProps = {
		children: Snippet;
		variant?: Variant;
		size?: Size;
		fullWidth?: boolean;
		class?: string;
	};

	type Props = CommonProps &
		(({ href: string } & Omit<HTMLAnchorAttributes, 'class' | 'children'>) | ({ href?: undefined } & Omit<HTMLButtonAttributes, 'class' | 'children'>));

	let {
		children,
		variant = 'primary',
		size = 'md',
		fullWidth = false,
		class: className = '',
		href,
		...rest
	}: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

	const variants: Record<Variant, string> = {
		primary:
			'bg-primary-600 text-white shadow-md shadow-primary-600/25 hover:bg-primary-700 active:bg-primary-800',
		secondary:
			'border border-neutral-300 bg-white text-neutral-800 hover:border-secondary-400 hover:text-secondary-700',
		ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
	};

	const sizes: Record<Size, string> = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-5 py-2.5 text-sm',
		lg: 'px-7 py-3.5 text-base'
	};

	const width = $derived(fullWidth ? 'w-full' : '');
	const classes = $derived(
		`${base} ${variants[variant]} ${sizes[size]} ${width} ${className}`.trim()
	);
</script>

{#if href}
	<a {href} class={classes} {...rest as HTMLAnchorAttributes}>
		{@render children()}
	</a>
{:else}
	<button class={classes} {...rest as HTMLButtonAttributes}>
		{@render children()}
	</button>
{/if}
