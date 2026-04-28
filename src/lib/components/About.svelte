<script lang="ts">
	import Card from './Card.svelte';
	import Section from './Section.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { reveal } from '../actions/reveal';
	import { misi, principal, sejarah, site, visi } from '../config/site';
</script>

<Section id="tentang" tone="default" spacing="lg">
	<SectionHeading
		eyebrow="Tentang Kami"
		title="Mengenal {site.name} lebih dekat"
		description="Sambutan kepala sekolah, visi & misi, hingga sejarah singkat — semua yang perlu Anda ketahui sebelum bergabung dengan keluarga besar kami."
		align="center"
		class="mx-auto"
	/>

	<!-- Sambutan kepala sekolah -->
	<div use:reveal class="mt-16 grid items-center gap-10 lg:grid-cols-[2fr_3fr]">
		<div class="relative">
			<div
				class="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary-200/60 via-warm-200/40 to-transparent blur-xl"
				aria-hidden="true"
			></div>
			<div
				class="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-xl shadow-neutral-900/10"
			>
				<img
					src={principal.photo}
					alt="Foto {principal.name}, {principal.title} {site.name}"
					class="h-full w-full object-cover"
					loading="lazy"
				/>
			</div>
		</div>

		<div use:reveal={{ delay: 120 }}>
			<span
				class="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-primary-700 uppercase"
			>
				<span class="size-1.5 rounded-full bg-primary-500"></span>
				Sambutan Kepala Sekolah
			</span>

			<blockquote class="mt-5 text-pretty text-xl leading-relaxed text-neutral-700 sm:text-2xl">
				<svg
					viewBox="0 0 24 24"
					aria-hidden="true"
					class="mb-3 size-8 text-primary-500"
					fill="currentColor"
				>
					<path
						d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6v-6H5.5A2.5 2.5 0 0 1 8 9.5V6H7.17Zm10 0A5.17 5.17 0 0 0 12 11.17V18h6v-6h-2.5A2.5 2.5 0 0 1 18 9.5V6h-.83Z"
					/>
				</svg>
				{principal.greeting}
			</blockquote>

			<div class="mt-6 flex items-center gap-3">
				<div
					class="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary-500 to-panel-800 font-bold text-white"
					aria-hidden="true"
				>
					{principal.name.charAt(0)}
				</div>
				<div>
					<p class="font-semibold text-neutral-900">{principal.name}</p>
					<p class="text-sm text-neutral-500">{principal.title} · {site.name}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Visi & Misi -->
	<div class="mt-24 grid gap-6 md:grid-cols-2">
		<div use:reveal>
			<Card variant="default" padding="lg" class="h-full">
				<div class="flex items-center gap-3">
					<span
						class="grid size-10 place-items-center rounded-xl bg-primary-100 text-primary-700"
						aria-hidden="true"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="size-5"
						>
							<circle cx="12" cy="12" r="3" />
							<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
						</svg>
					</span>
					<h3 class="font-mono text-xs font-bold tracking-[0.2em] text-primary-700 uppercase">Visi</h3>
				</div>
				<p class="mt-5 text-pretty text-lg leading-relaxed text-neutral-800">{visi}</p>
			</Card>
		</div>

		<div use:reveal={{ delay: 120 }}>
			<Card variant="default" padding="lg" class="h-full">
				<div class="flex items-center gap-3">
					<span
						class="grid size-10 place-items-center rounded-xl bg-warm-100 text-warm-700"
						aria-hidden="true"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="size-5"
						>
							<path d="m5 12 5 5L20 7" />
						</svg>
					</span>
					<h3 class="font-mono text-xs font-bold tracking-[0.2em] text-warm-700 uppercase">Misi</h3>
				</div>
				<ul class="mt-5 space-y-3 text-neutral-700">
					{#each misi as item, i (i)}
						<li class="flex gap-3">
							<span
								class="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-warm-100 text-[10px] font-bold text-warm-700"
								aria-hidden="true"
							>
								{i + 1}
							</span>
							<span class="leading-relaxed">{item}</span>
						</li>
					{/each}
				</ul>
			</Card>
		</div>
	</div>

	<!-- Sejarah singkat -->
	<div use:reveal class="mt-24 grid items-center gap-10 lg:grid-cols-[3fr_2fr]">
		<div use:reveal>
			<span
				class="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-neutral-600 uppercase"
			>
				<span class="size-1.5 rounded-full bg-neutral-400"></span>
				Sejarah Singkat
			</span>
			<h3
				class="mt-5 text-balance text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl"
			>
				{sejarah.headline}
			</h3>
			<p class="mt-5 text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
				{sejarah.body}
			</p>
		</div>

		<div use:reveal={{ delay: 120 }} class="relative">
			<div
				class="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-warm-100 via-primary-100 to-transparent blur-xl"
				aria-hidden="true"
			></div>
			<div
				class="aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-xl shadow-neutral-900/10"
			>
				<img
					src={sejarah.image}
					alt="Ilustrasi gedung sekolah dari masa ke masa"
					class="h-full w-full object-cover"
					loading="lazy"
				/>
			</div>
		</div>
	</div>
</Section>
