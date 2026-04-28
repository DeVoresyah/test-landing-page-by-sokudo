<script lang="ts">
	import Card from './Card.svelte';
	import Section from './Section.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { reveal } from '../actions/reveal';
	import { achievements, levelLabels, levelStyles } from '../data/achievements';

	const featured = achievements.find((a) => a.featured);
	const rest = achievements.filter((a) => !a.featured);
</script>

<Section id="prestasi" tone="default" spacing="lg">
	<SectionHeading
		eyebrow="Prestasi"
		title="Karya dan pencapaian yang membanggakan"
		description="Rekam jejak siswa kami di kompetisi akademik, sains, olahraga, dan seni — dari tingkat kabupaten sampai internasional."
		align="center"
		class="mx-auto"
	/>

	{#if featured}
		<div use:reveal class="mt-12">
			<div
				class="relative isolate overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-warm-50 p-8 shadow-sm sm:p-10 lg:p-12"
			>
				<div
					aria-hidden="true"
					class="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary-200/40 blur-3xl"
				></div>
				<div
					aria-hidden="true"
					class="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-warm-200/40 blur-3xl"
				></div>

				<div
					class="relative grid items-center gap-8 lg:grid-cols-[auto_minmax(0,1fr)_auto]"
				>
					<span
						class="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-panel-800 text-white shadow-lg shadow-primary-500/30"
						aria-hidden="true"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.75"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="size-8"
						>
							<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
							<path d="M17 5h3v3a3 3 0 0 1-3 3M7 5H4v3a3 3 0 0 0 3 3" />
						</svg>
					</span>

					<div>
						<div class="flex flex-wrap items-center gap-2">
							<span
								class="inline-flex items-center rounded-full border border-primary-200 bg-white/80 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-primary-700"
							>
								Prestasi Unggulan
							</span>
							<span
								class="inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider {levelStyles[
									featured.level
								]}"
							>
								{levelLabels[featured.level]}
							</span>
							<span class="font-mono text-xs font-semibold text-neutral-500">{featured.year}</span>
						</div>
						<h3
							class="mt-4 text-balance text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl"
						>
							{featured.title}
						</h3>
						<p class="mt-2 text-sm text-neutral-600">
							{featured.awardee} · {featured.category}
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each rest as a, i (a.id)}
			<div use:reveal={{ delay: (i % 3) * 80 }} class="h-full">
				<Card interactive padding="lg" class="flex h-full flex-col">
					<div class="flex items-start justify-between gap-3">
						<span
							class="grid size-11 place-items-center rounded-xl bg-warm-100 text-warm-700"
							aria-hidden="true"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.75"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="size-5"
							>
								<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
								<path d="M17 5h3v3a3 3 0 0 1-3 3M7 5H4v3a3 3 0 0 0 3 3" />
							</svg>
						</span>
						<span
							class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider {levelStyles[
								a.level
							]}"
						>
							{levelLabels[a.level]}
						</span>
					</div>

					<h3 class="mt-5 text-base font-bold leading-snug text-neutral-900">{a.title}</h3>

					<dl class="mt-4 space-y-1.5 text-sm text-neutral-600">
						<div class="flex items-center gap-2">
							<dt class="text-neutral-400">Diraih oleh</dt>
							<dd class="font-medium text-neutral-800">{a.awardee}</dd>
						</div>
						<div class="flex items-center gap-2">
							<dt class="text-neutral-400">Tahun</dt>
							<dd class="font-medium text-neutral-800">{a.year}</dd>
						</div>
						<div class="flex items-center gap-2">
							<dt class="text-neutral-400">Kategori</dt>
							<dd class="font-medium text-neutral-800">{a.category}</dd>
						</div>
					</dl>
				</Card>
			</div>
		{/each}
	</div>
</Section>
