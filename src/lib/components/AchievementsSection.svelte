<script lang="ts">
	import Section from './Section.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { reveal } from '../actions/reveal';
	import {
		achievements,
		levelLabels,
		type AchievementLevel
	} from '../data/achievements';

	const levelOrder: AchievementLevel[] = [
		'internasional',
		'nasional',
		'provinsi',
		'kabupaten'
	];

	const stats = levelOrder.map((level) => ({
		level,
		label: levelLabels[level],
		count: achievements.filter((a) => a.level === level).length
	}));

	const totalCount = achievements.length;
	const latestYear = Math.max(...achievements.map((a) => a.year));

	// DESIGN.md media-card pattern (rounded 14px). Each tile gets a tinted
	// placeholder block keyed off the achievement level so the row reads as
	// distinct media even without real photography.
	const mediaTints: Record<AchievementLevel, string> = {
		internasional: 'from-warm-200 to-warm-100 text-warm-700',
		nasional: 'from-primary-200 to-primary-100 text-primary-700',
		provinsi: 'from-warm-100 to-warm-50 text-warm-700',
		kabupaten: 'from-neutral-200 to-neutral-100 text-neutral-700'
	};
</script>

<Section id="prestasi" tone="default" spacing="lg">
	<SectionHeading
		eyebrow="Prestasi"
		title="Karya dan pencapaian yang membanggakan"
		description="Rekam jejak siswa kami di kompetisi akademik, sains, olahraga, dan seni — dari tingkat kabupaten sampai internasional."
		align="center"
		class="mx-auto"
	/>

	<!-- Stat cards: flat surface, subtle border, no nesting. -->
	<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div
			use:reveal
			class="rounded-md border border-neutral-200 bg-white p-6"
		>
			<p class="text-3xl font-semibold tabular-nums text-neutral-900">{totalCount}</p>
			<p class="mt-2 text-xs font-semibold tracking-[0.18em] text-primary-700 uppercase">
				Total prestasi
			</p>
			<p class="mt-1 text-sm text-neutral-500">Tercatat sampai {latestYear}</p>
		</div>

		{#each stats as stat, i (stat.level)}
			<div
				use:reveal={{ delay: (i + 1) * 80 }}
				class="rounded-md border border-neutral-200 bg-white p-6"
			>
				<p class="text-3xl font-semibold tabular-nums text-neutral-900">{stat.count}</p>
				<p class="mt-2 text-xs font-semibold tracking-[0.18em] text-primary-700 uppercase">
					Tingkat {stat.label}
				</p>
				<p class="mt-1 text-sm text-neutral-500">
					{stat.count > 0 ? 'Terbaru ' + Math.max(...achievements.filter((a) => a.level === stat.level).map((a) => a.year)) : 'Belum ada catatan'}
				</p>
			</div>
		{/each}
	</div>

	<!-- Compact media row: rounded-14px tiles, no nested cards. -->
	<div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each achievements as a, i (a.id)}
			<article
				use:reveal={{ delay: (i % 3) * 80 }}
				class="overflow-hidden rounded-[14px] border border-neutral-200 bg-white"
			>
				<div
					class="grid aspect-[16/10] place-items-center bg-gradient-to-br {mediaTints[a.level]}"
					aria-hidden="true"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="size-12 opacity-80"
					>
						<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
						<path d="M17 5h3v3a3 3 0 0 1-3 3M7 5H4v3a3 3 0 0 0 3 3" />
					</svg>
				</div>
				<div class="flex flex-col gap-2 p-5">
					<p class="text-xs font-semibold tracking-[0.18em] text-primary-700 uppercase">
						{levelLabels[a.level]} · {a.year}
					</p>
					<h3 class="text-base font-semibold leading-snug text-neutral-900">
						{a.title}
					</h3>
					<p class="text-sm text-neutral-500">
						{a.awardee} · {a.category}
					</p>
				</div>
			</article>
		{/each}
	</div>
</Section>
