<script lang="ts">
	import Button from './Button.svelte';
	import Container from './Container.svelte';
	import { ctaPrimary, ctaSecondary, site, stats } from '../config/site';
	import { reveal } from '../actions/reveal';

	// Unsplash classroom photo — used as media-preview placeholder until the
	// school provides original photography.
	const heroImage =
		'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1400&q=80';
</script>

<section
	id="beranda"
	class="relative isolate overflow-hidden bg-white pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-24"
>
	<!-- Soft gradient blobs — restrained accent per DESIGN.md direction A -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute -top-40 -left-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary-100/70 blur-3xl"
	></div>
	<div
		aria-hidden="true"
		class="pointer-events-none absolute -bottom-32 right-[-8rem] -z-10 h-[24rem] w-[24rem] rounded-full bg-warm-100/70 blur-3xl"
	></div>

	<Container>
		<div class="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
			<!-- LEFT: copy, CTAs, stats -->
			<div>
				<span
					use:reveal
					class="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-primary-700 uppercase"
				>
					<span class="size-1.5 rounded-full bg-primary-500"></span>
					Pendaftaran Siswa Baru 2026 / 2027 dibuka
				</span>

				<h1
					use:reveal={{ delay: 80 }}
					class="mt-6 text-balance text-4xl leading-[1.12] font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-[48px]"
				>
					Selamat Datang di
					<span
						class="block bg-gradient-to-r from-primary-600 via-primary-700 to-panel-800 bg-clip-text text-transparent"
					>
						{site.name}
					</span>
				</h1>

				<p
					use:reveal={{ delay: 160 }}
					class="mt-5 max-w-xl text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg"
				>
					{site.description} Kami menumbuhkan rasa ingin tahu, karakter, dan keberanian
					berkarya di setiap pelajar — sejak hari pertama.
				</p>

				<div use:reveal={{ delay: 240 }} class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
					<Button href={ctaPrimary.href} size="lg">
						{ctaPrimary.label}
						<span aria-hidden="true">→</span>
					</Button>
					<a
						href={ctaSecondary.href}
						class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 underline-offset-4 transition hover:text-primary-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
					>
						{ctaSecondary.label}
						<span aria-hidden="true">→</span>
					</a>
				</div>

				<dl
					use:reveal={{ delay: 320 }}
					class="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-neutral-200 pt-8 sm:grid-cols-4"
				>
					{#each stats as stat (stat.label)}
						<div>
							<dd
								class="bg-gradient-to-r from-primary-700 to-panel-800 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl"
							>
								{stat.value}
							</dd>
							<dt
								class="mt-1.5 font-mono text-[11px] font-semibold tracking-wider text-neutral-500 uppercase"
							>
								{stat.label}
							</dt>
						</div>
					{/each}
				</dl>
			</div>

			<!-- RIGHT: media preview -->
			<div use:reveal={{ delay: 200 }} class="relative">
				<div
					class="relative overflow-hidden rounded-[14px] bg-neutral-100 shadow-panel ring-1 ring-neutral-200"
				>
					<img
						src={heroImage}
						alt="Suasana belajar di {site.name}"
						loading="eager"
						decoding="async"
						class="aspect-[4/5] h-full w-full object-cover sm:aspect-[5/6] lg:aspect-[4/5]"
					/>

					<!-- Subtle gradient at the bottom so chips stay legible -->
					<div
						aria-hidden="true"
						class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-900/55 to-transparent"
					></div>

					<!-- Top-left chip: small badge label -->
					<div
						class="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-card backdrop-blur"
					>
						<span class="relative flex size-1.5">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm-400 opacity-70"
							></span>
							<span class="relative inline-flex size-1.5 rounded-full bg-warm-500"></span>
						</span>
						<span
							class="font-mono text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
						>
							Suasana belajar
						</span>
					</div>

					<!-- Bottom-right chip: tiny meta -->
					<div
						class="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-card backdrop-blur"
					>
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.8"
							class="size-3.5 text-neutral-500"
						>
							<path
								d="M12 21s-7-4.35-7-10a7 7 0 1 1 14 0c0 5.65-7 10-7 10Z"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<circle cx="12" cy="11" r="2.5" />
						</svg>
						<span
							class="font-mono text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
						>
							Jakarta Selatan
						</span>
					</div>
				</div>
			</div>
		</div>
	</Container>
</section>
