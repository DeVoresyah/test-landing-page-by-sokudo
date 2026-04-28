<script lang="ts">
	import Container from './Container.svelte';
	import { reveal } from '../actions/reveal';

	export type BrandLogo = {
		name: string;
		mark?: string;
	};

	type Props = {
		logos?: BrandLogo[];
		eyebrow?: string;
		class?: string;
	};

	// DESIGN.md: full-width brand-500 band, 96–120px tall, with white wordmark
	// placeholders evenly distributed. Used as a "trusted by / partners" strip.
	const defaults: BrandLogo[] = [
		{ name: 'Kemdikbud' },
		{ name: 'BAN-S/M' },
		{ name: 'Cambridge' },
		{ name: 'BSI' },
		{ name: 'PASCH' },
		{ name: 'OSN' }
	];

	let { logos = defaults, eyebrow, class: className = '' }: Props = $props();
</script>

<section
	aria-label={eyebrow ?? 'Mitra dan akreditasi'}
	class="bg-primary-500 text-white {className}"
>
	<Container>
		<div
			use:reveal
			class="flex min-h-[96px] flex-col items-center justify-center gap-4 py-6 sm:min-h-[120px] sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-3 sm:py-8"
		>
			{#if eyebrow}
				<span
					class="font-mono text-xs font-semibold tracking-[0.22em] text-white/80 uppercase sm:mr-4"
				>
					{eyebrow}
				</span>
			{/if}
			{#each logos as logo (logo.name)}
				<span
					class="text-base font-semibold tracking-tight text-white/90 sm:text-lg"
					title={logo.name}
				>
					{logo.mark ?? logo.name}
				</span>
			{/each}
		</div>
	</Container>
</section>
