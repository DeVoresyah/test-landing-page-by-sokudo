<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'icon';
	type Size = 'sm' | 'md' | 'lg';

	type CommonProps = {
		children: Snippet;
		variant?: Variant;
		size?: Size;
		fullWidth?: boolean;
		class?: string;
		href?: string;
		target?: HTMLAnchorAttributes['target'];
		rel?: HTMLAnchorAttributes['rel'];
		'aria-label'?: string;
		type?: HTMLButtonAttributes['type'];
		disabled?: HTMLButtonAttributes['disabled'];
		onclick?: (event: MouseEvent) => void;
	};

	type Props = CommonProps;

	let {
		children,
		variant = 'primary',
		size = 'md',
		fullWidth = false,
		class: className = '',
		href,
		target,
		rel,
		'aria-label': ariaLabel,
		type = 'button',
		disabled,
		onclick
	}: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

	// DESIGN.md: pill primary on brand-500 with the dedicated button shadow,
	// pill secondary as a transparent brand-bordered control, ghost for low-
	// emphasis text actions, icon as a 48px circular brand-bordered button.
	const variants: Record<Variant, string> = {
		primary:
			'rounded-full bg-primary-500 text-white shadow-button hover:bg-primary-600 active:bg-primary-700',
		secondary:
			'rounded-full border border-primary-600 bg-transparent text-primary-600 hover:bg-primary-50 active:bg-primary-100',
		ghost: 'rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
		icon: 'h-12 w-12 rounded-full border border-primary-600 bg-transparent p-0 text-primary-600 hover:bg-primary-50'
	};

	const sizes: Record<Size, string> = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-5 py-2.5 text-sm',
		lg: 'px-7 py-3.5 text-base'
	};

	const isIcon = $derived(variant === 'icon');
	const sizing = $derived(isIcon ? '' : sizes[size]);
	const width = $derived(fullWidth && !isIcon ? 'w-full' : '');
	const classes = $derived(`${base} ${variants[variant]} ${sizing} ${width} ${className}`.trim());
</script>

{#if href}
	<a {href} {target} {rel} aria-label={ariaLabel} {onclick} class={classes}>
		{@render children()}
	</a>
{:else}
	<button {type} {disabled} aria-label={ariaLabel} {onclick} class={classes}>
		{@render children()}
	</button>
{/if}
