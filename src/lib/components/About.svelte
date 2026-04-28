<script lang="ts">
	import Section from './Section.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import SectionLabelTab from './SectionLabelTab.svelte';
	import { reveal } from '../actions/reveal';
	import { misi, principal, sejarah, site, visi } from '../config/site';

	type AboutCard = {
		eyebrow: string;
		titleLead: string;
		titleHighlight: string;
		titleTail: string;
		body: string;
		href: string;
		iconPath: string;
	};

	// DESIGN.md feature card grid: line icon, strong title with one keyword in
	// brand blue, short body, circular arrow affordance. Copy is reused from
	// site config — same content, simpler treatment.
	const cards: AboutCard[] = [
		{
			eyebrow: 'Visi',
			titleLead: 'Sekolah ',
			titleHighlight: 'unggul',
			titleTail: ' yang melahirkan pelajar Pancasila siap kontribusi global.',
			body: visi,
			href: '#tentang',
			iconPath: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z'
		},
		{
			eyebrow: 'Misi',
			titleLead: 'Empat pilar pembelajaran yang ',
			titleHighlight: 'berdampak',
			titleTail: ' bagi siswa, keluarga, dan masyarakat.',
			body: misi.join(' '),
			href: '#tentang',
			iconPath: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'
		},
		{
			eyebrow: 'Sejarah',
			titleLead: 'Tiga dekade ',
			titleHighlight: 'menumbuhkan',
			titleTail: ' generasi pembelajar di Jakarta Selatan.',
			body: sejarah.body,
			href: '#tentang',
			iconPath: 'M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
		}
	];
</script>

<Section id="tentang" tone="muted" spacing="lg" class="relative">
	<SectionLabelTab label="Tentang" />

	<SectionHeading
		eyebrow="Tentang Kami"
		title="Mengenal {site.name} lebih dekat"
		description="Sambutan kepala sekolah, visi & misi, hingga sejarah singkat — semua yang perlu Anda ketahui sebelum bergabung dengan keluarga besar kami."
		align="center"
		class="mx-auto"
	/>

	<!-- Principal lead block: a flat blockquote, no gradient or heavy shadow. -->
	<div
		use:reveal
		class="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-8"
	>
		<div
			class="size-20 overflow-hidden rounded-[14px] border border-neutral-200 bg-neutral-100 sm:size-24"
		>
			<img
				src={principal.photo}
				alt="Foto {principal.name}, {principal.title} {site.name}"
				class="h-full w-full object-cover"
				loading="lazy"
			/>
		</div>
		<blockquote class="text-pretty text-base leading-relaxed text-neutral-700">
			<p>“{principal.greeting}”</p>
			<footer class="mt-3 text-sm text-neutral-500">
				— {principal.name}, {principal.title}
			</footer>
		</blockquote>
	</div>

	<!-- DESIGN.md feature card grid: 3 columns desktop, 1 column mobile. -->
	<div class="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
		{#each cards as card, i (card.eyebrow)}
			<a
				use:reveal={{ delay: i * 80 }}
				href={card.href}
				class="group flex flex-col gap-5 rounded-md border border-neutral-200 bg-neutral-50 p-6 transition hover:border-primary-300 hover:bg-white"
			>
				<div class="flex items-start justify-between gap-4">
					<span
						class="grid size-10 place-items-center rounded-md border border-neutral-200 bg-white text-primary-600"
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
							<path d={card.iconPath} />
						</svg>
					</span>
					<span
						class="text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase"
					>
						{card.eyebrow}
					</span>
				</div>

				<h3 class="text-lg font-semibold leading-snug text-neutral-900">
					{card.titleLead}<span class="text-primary-600">{card.titleHighlight}</span>{card.titleTail}
				</h3>

				<p class="line-clamp-4 text-sm leading-relaxed text-neutral-600">
					{card.body}
				</p>

				<span
					class="mt-auto inline-grid size-10 place-items-center rounded-pill border border-primary-600 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white"
					aria-hidden="true"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="size-4"
					>
						<path d="M5 12h14M13 5l7 7-7 7" />
					</svg>
				</span>
			</a>
		{/each}
	</div>
</Section>
