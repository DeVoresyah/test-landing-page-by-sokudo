<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';
	import Section from '$lib/components/Section.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import { ctaPrimary, site } from '$lib/config/site';

	const stats = [
		{ label: 'Siswa aktif', value: '1.240+' },
		{ label: 'Guru & staf', value: '86' },
		{ label: 'Program unggulan', value: '24' },
		{ label: 'Tahun berdedikasi', value: '32' }
	];
</script>

<svelte:head>
	<title>{site.name} — {site.tagline}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<section id="beranda" class="relative isolate overflow-hidden bg-white">
	<div
		aria-hidden="true"
		class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
	>
		<div
			class="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-primary-400 to-secondary-500 opacity-25"
			style="clip-path: polygon(74% 44%, 100% 61%, 97% 26%, 85% 0%, 80% 2%, 72% 32%, 60% 62%, 52% 68%, 47% 58%, 45% 34%, 27% 76%, 0% 64%, 17% 100%, 27% 76%, 76% 97%, 74% 44%)"
		></div>
	</div>

	<Container>
		<div class="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
			<div>
				<span
					class="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
				>
					<span class="size-1.5 rounded-full bg-primary-500"></span>
					Pendaftaran Siswa Baru 2026 / 2027
				</span>
				<h1
					class="mt-6 text-balance text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl"
				>
					Belajar, tumbuh, dan
					<span
						class="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
					>
						berdampak
					</span>
					di masa depan.
				</h1>
				<p class="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
					{site.description}
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<Button href={ctaPrimary.href} size="lg">{ctaPrimary.label}</Button>
					<Button href="#program" variant="secondary" size="lg">Jelajahi Program</Button>
				</div>
			</div>

			<div class="relative">
				<div
					class="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-700 p-1 shadow-2xl shadow-secondary-900/20"
				>
					<div class="grid h-full place-items-center rounded-3xl bg-neutral-50 text-center">
						<div class="space-y-2 px-8">
							<div
								class="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 text-2xl text-white shadow-lg"
							>
								★
							</div>
							<p class="text-sm font-semibold uppercase tracking-widest text-neutral-500">
								Akreditasi A
							</p>
							<p class="text-2xl font-bold text-neutral-900">Sekolah Penggerak</p>
							<p class="max-w-sm text-sm text-neutral-600">
								Diakui Kemendikbudristek sebagai sekolah dengan praktik pembelajaran terbaik.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Container>
</section>

<Section tone="muted" spacing="md">
	<SectionHeading
		eyebrow="Sekilas Sekolah"
		title="Angka yang berbicara tentang kami"
		description="Tiga dekade konsisten mengembangkan ekosistem belajar yang menumbuhkan rasa ingin tahu, karakter, dan prestasi."
		align="center"
		class="mx-auto"
	/>

	<dl class="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
		{#each stats as stat (stat.label)}
			<Card interactive>
				<dt class="text-sm font-medium text-neutral-500">{stat.label}</dt>
				<dd
					class="mt-2 bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-3xl font-extrabold text-transparent"
				>
					{stat.value}
				</dd>
			</Card>
		{/each}
	</dl>
</Section>
