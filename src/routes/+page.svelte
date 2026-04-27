<script lang="ts">
	const stats = [
		{ label: 'Students', value: '1,240+' },
		{ label: 'Teachers', value: '86' },
		{ label: 'Programs', value: '24' },
		{ label: 'Years of excellence', value: '32' }
	];
</script>

<svelte:head>
	<title>SMA Harapan Bangsa — Belajar, Tumbuh, Berdampak</title>
	<meta
		name="description"
		content="Sekolah menengah atas modern dengan kurikulum bertaraf internasional dan ekosistem belajar yang menumbuhkan."
	/>
</svelte:head>

<main class="relative isolate overflow-hidden">
	<!-- Decorative background -->
	<div
		aria-hidden="true"
		class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
	>
		<div
			class="relative left-1/2 aspect-[1155/678] w-[72rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-primary-400 to-secondary-500 opacity-25"
			style="clip-path: polygon(74% 44%, 100% 61%, 97% 26%, 85% 0%, 80% 2%, 72% 32%, 60% 62%, 52% 68%, 47% 58%, 45% 34%, 27% 76%, 0% 64%, 17% 100%, 27% 76%, 76% 97%, 74% 44%)"
		></div>
	</div>

	<!-- Nav -->
	<header class="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
		<a href="/" class="flex items-center gap-2 font-bold text-primary-700">
			<span
				class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-md shadow-primary-500/30"
			>
				H
			</span>
			<span class="text-lg tracking-tight">Harapan Bangsa</span>
		</a>
		<nav class="hidden items-center gap-8 text-sm font-medium text-neutral-700 md:flex">
			<a href="#about" class="hover:text-primary-700">About</a>
			<a href="#programs" class="hover:text-primary-700">Programs</a>
			<a href="#admission" class="hover:text-primary-700">Admission</a>
			<a href="#contact" class="hover:text-primary-700">Contact</a>
		</nav>
		<a
			href="#admission"
			class="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-primary-600/30 transition hover:bg-primary-700"
		>
			Apply now
		</a>
	</header>

	<!-- Hero -->
	<section class="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-8 lg:pt-20">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div>
				<span
					class="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
				>
					<span class="size-1.5 rounded-full bg-primary-500"></span>
					Open enrollment 2026 / 2027
				</span>
				<h1
					class="mt-6 text-balance text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl"
				>
					Belajar, tumbuh, dan
					<span
						class="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
						>berdampak</span
					>
					di masa depan.
				</h1>
				<p class="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
					Lingkungan sekolah modern dengan kurikulum bertaraf internasional, guru
					berdedikasi, dan ekosistem yang menumbuhkan rasa ingin tahu.
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<a
						href="#admission"
						class="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary-600/30 transition hover:bg-primary-700"
					>
						Daftar sekarang
					</a>
					<a
						href="#programs"
						class="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-secondary-400 hover:text-secondary-700"
					>
						Jelajahi program
					</a>
				</div>
			</div>

			<div class="relative">
				<div
					class="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-700 p-1 shadow-2xl shadow-secondary-900/20"
				>
					<div
						class="grid h-full place-items-center rounded-3xl bg-neutral-50 text-center"
					>
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

		<!-- Stats -->
		<dl class="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
			{#each stats as stat}
				<div
					class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
				>
					<dt class="text-sm font-medium text-neutral-500">{stat.label}</dt>
					<dd
						class="mt-2 bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-3xl font-extrabold text-transparent"
					>
						{stat.value}
					</dd>
				</div>
			{/each}
		</dl>
	</section>
</main>
