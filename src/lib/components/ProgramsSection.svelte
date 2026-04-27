<script lang="ts">
	import Card from './Card.svelte';
	import Section from './Section.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { reveal } from '../actions/reveal';
	import { programs } from '../data/programs';
</script>

<Section id="program" tone="muted" spacing="lg">
	<SectionHeading
		eyebrow="Program"
		title="Jalur belajar yang sesuai minat dan masa depan"
		description="Pilih penjurusan yang paling sesuai dengan kekuatan dan cita-cita putra-putri Anda — setiap program didukung guru spesialis, fasilitas memadai, dan jejaring industri."
		align="center"
		class="mx-auto"
	/>

	<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each programs as p, i (p.id)}
			{@const tint =
				p.tone === 'primary'
					? 'bg-primary-100 text-primary-700'
					: 'bg-secondary-100 text-secondary-700'}
			{@const link =
				p.tone === 'primary'
					? 'text-primary-700 hover:text-primary-800'
					: 'text-secondary-700 hover:text-secondary-800'}
			<div use:reveal={{ delay: i * 80 }} class="h-full">
				<Card interactive padding="lg" class="flex h-full flex-col">
					<span
						class="grid size-12 place-items-center rounded-xl {tint}"
						aria-hidden="true"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.75"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="size-6"
						>
							<path d={p.iconPath} />
						</svg>
					</span>

					<div class="mt-5">
						<p class="text-xs font-semibold uppercase tracking-wider text-neutral-500">
							{p.tagline}
						</p>
						<h3 class="mt-1 text-xl font-bold text-neutral-900">{p.name}</h3>
					</div>

					<p class="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{p.description}</p>

					<a
						href={p.href}
						class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold {link}"
					>
						Selengkapnya
						<span aria-hidden="true">→</span>
					</a>
				</Card>
			</div>
		{/each}
	</div>
</Section>
