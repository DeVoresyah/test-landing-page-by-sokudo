<script lang="ts">
	import Container from './Container.svelte';
	import { reveal } from '../actions/reveal';

	export type DarkFeatureItem = {
		title: string;
		description?: string;
	};

	type Props = {
		eyebrow?: string;
		title: string;
		description?: string;
		features: DarkFeatureItem[];
		image?: string;
		imageAlt?: string;
		id?: string;
		class?: string;
	};

	let {
		eyebrow,
		title,
		description,
		features,
		image = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
		imageAlt = 'Suasana belajar di SMA Harapan Bangsa',
		id,
		class: className = ''
	}: Props = $props();
</script>

<section
	{id}
	class="panel-grain relative bg-panel-900 py-16 text-neutral-100 lg:py-24 {className}"
>
	<Container>
		<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
			<div use:reveal class="flex flex-col gap-8">
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
					<p class="max-w-xl text-pretty text-base leading-relaxed text-neutral-300">
						{description}
					</p>
				{/if}

				<ol class="flex flex-col divide-y divide-white/10 border-y border-white/10">
					{#each features as feature, i (feature.title)}
						<li
							use:reveal={{ delay: 80 * i }}
							class="flex items-start gap-5 py-5"
						>
							<span
								class="font-mono text-2xl font-semibold tabular-nums text-primary-400 sm:text-3xl"
							>
								{String(i + 1).padStart(2, '0')}
							</span>
							<div class="flex flex-col gap-1">
								<h3 class="text-lg font-semibold tracking-tight text-white">
									{feature.title}
								</h3>
								{#if feature.description}
									<p class="text-sm leading-relaxed text-neutral-300">
										{feature.description}
									</p>
								{/if}
							</div>
						</li>
					{/each}
				</ol>
			</div>

			<div
				use:reveal={{ delay: 120 }}
				class="relative overflow-hidden rounded-3xl border border-white/10 shadow-panel"
			>
				<img
					src={image}
					alt={imageAlt}
					loading="lazy"
					class="aspect-[4/5] w-full object-cover sm:aspect-[5/6] lg:aspect-[4/5]"
				/>
				<div
					class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-panel-900/40 via-transparent to-primary-500/10"
				></div>
			</div>
		</div>
	</Container>
</section>
