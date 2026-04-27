<script lang="ts">
	import Button from './Button.svelte';
	import Container from './Container.svelte';
	import { ctaPrimary, ctaSecondary, site } from '../config/site';
	import { reveal } from '../actions/reveal';
</script>

<section
	id="beranda"
	class="relative isolate min-h-[88vh] overflow-hidden bg-neutral-900 text-white"
>
	<!-- Full-bleed background image -->
	<img
		src="/placeholders/hero.svg"
		alt=""
		aria-hidden="true"
		class="absolute inset-0 -z-30 h-full w-full object-cover"
	/>

	<!-- Soft green/blue gradient overlay -->
	<div
		aria-hidden="true"
		class="absolute inset-0 -z-20 bg-gradient-to-br from-primary-700/85 via-primary-600/65 to-secondary-700/85"
	></div>

	<!-- Bottom-up vignette to seat the type on the image -->
	<div
		aria-hidden="true"
		class="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-900/70 via-neutral-900/10 to-transparent"
	></div>

	<!-- Decorative blob -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute -top-20 right-[-10%] -z-10 h-[28rem] w-[28rem] rounded-full bg-primary-300/30 blur-3xl"
	></div>

	<Container>
		<div class="flex min-h-[88vh] flex-col justify-center py-24 lg:py-32">
			<div class="max-w-3xl">
				<span
					use:reveal
					class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase backdrop-blur"
				>
					<span class="size-1.5 rounded-full bg-primary-300"></span>
					Pendaftaran Siswa Baru 2026 / 2027 dibuka
				</span>

				<h1
					use:reveal={{ delay: 80 }}
					class="mt-6 text-balance text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
				>
					Selamat Datang di
					<span
						class="block bg-gradient-to-r from-primary-200 via-white to-secondary-200 bg-clip-text text-transparent"
					>
						{site.name}
					</span>
				</h1>

				<p
					use:reveal={{ delay: 160 }}
					class="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl"
				>
					{site.description} Kami menumbuhkan rasa ingin tahu, karakter, dan keberanian
					berkarya di setiap pelajar — sejak hari pertama.
				</p>

				<div use:reveal={{ delay: 240 }} class="mt-10 flex flex-wrap gap-3">
					<Button href={ctaPrimary.href} size="lg">
						{ctaPrimary.label}
						<span aria-hidden="true">→</span>
					</Button>
					<Button
						href={ctaSecondary.href}
						variant="secondary"
						size="lg"
						class="border-white/30 bg-white/10 text-white backdrop-blur hover:border-white/60 hover:bg-white/20 hover:text-white"
					>
						{ctaSecondary.label}
					</Button>
				</div>
			</div>
		</div>
	</Container>

	<!-- Scroll indicator -->
	<a
		href="#tentang"
		aria-label="Gulir ke bagian Tentang"
		class="group absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-2 text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-700"
	>
		<span class="text-[11px] font-semibold tracking-[0.2em] uppercase">Gulir</span>
		<span
			class="animate-scroll-bob flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur"
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-4"
				aria-hidden="true"
			>
				<path d="M12 5v14" />
				<path d="m19 12-7 7-7-7" />
			</svg>
		</span>
	</a>
</section>
