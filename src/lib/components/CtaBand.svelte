<script lang="ts">
	import Container from './Container.svelte';
	import Button from './Button.svelte';
	import { reveal } from '../actions/reveal';

	type Props = {
		title: string;
		ctaLabel: string;
		ctaHref: string;
		eyebrow?: string;
		description?: string;
		id?: string;
		class?: string;
	};

	let {
		title,
		ctaLabel,
		ctaHref,
		eyebrow,
		description,
		id,
		class: className = ''
	}: Props = $props();
</script>

<section {id} class="bg-white py-12 lg:py-16 {className}">
	<Container>
		<div
			use:reveal
			class="panel-grain flex flex-col items-start gap-8 rounded-[14px] bg-panel-900 px-8 py-12 text-white shadow-panel sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-16 lg:py-16"
		>
			<div class="flex max-w-2xl flex-col gap-3">
				{#if eyebrow}
					<span
						class="font-mono text-xs font-semibold tracking-[0.22em] text-primary-300 uppercase"
					>
						{eyebrow}
					</span>
				{/if}
				<h2 class="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
					{title}
				</h2>
				{#if description}
					<p class="text-pretty text-base leading-relaxed text-neutral-300">
						{description}
					</p>
				{/if}
			</div>

			<Button href={ctaHref} variant="primary" size="lg">{ctaLabel}</Button>
		</div>
	</Container>
</section>
