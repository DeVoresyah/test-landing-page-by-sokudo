<script lang="ts">
	import { fade } from 'svelte/transition';

	type Props = {
		// Embed URL for Matterport / Google Street View / Pannellum / YouTube 360.
		// Loaded only after the user clicks the poster — keeps initial paint fast.
		embedUrl: string;
		title?: string;
		posterSrc?: string;
		posterSrcset?: string;
		posterAlt?: string;
	};

	let {
		embedUrl,
		title = 'Tur Virtual Sekolah',
		posterSrc = 'https://picsum.photos/seed/hb-virtual-tour/1600/900',
		posterSrcset = [480, 800, 1200, 1600, 2000]
			.map((w) => `https://picsum.photos/seed/hb-virtual-tour/${w}/${Math.round(w * 0.5625)} ${w}w`)
			.join(', '),
		posterAlt = 'Pratinjau tur virtual sekolah dari udara'
	}: Props = $props();

	let loaded = $state(false);
	const motionNormal = 220;
</script>

<div
	class="relative aspect-video w-full overflow-hidden rounded-3xl bg-panel-900 shadow-xl shadow-panel-900/20 ring-1 ring-neutral-200/60"
>
	{#if loaded}
		<iframe
			src={embedUrl}
			{title}
			loading="lazy"
			allow="accelerometer; gyroscope; autoplay; fullscreen; xr-spatial-tracking"
			allowfullscreen
			referrerpolicy="no-referrer-when-downgrade"
			class="absolute inset-0 size-full border-0"
			in:fade={{ duration: motionNormal }}
		></iframe>
	{:else}
		<button
			type="button"
			onclick={() => (loaded = true)}
			class="group absolute inset-0 size-full text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/60"
			aria-label="Mulai tur virtual sekolah"
		>
			<img
				src={posterSrc}
				srcset={posterSrcset}
				sizes="(min-width: 1024px) 1100px, 100vw"
				alt={posterAlt}
				width="1600"
				height="900"
				loading="lazy"
				decoding="async"
				class="absolute inset-0 size-full object-cover transition duration-normal group-hover:scale-[1.03]"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-tr from-neutral-950/80 via-neutral-950/40 to-transparent"
			></div>

			<div class="absolute inset-0 flex items-center justify-center">
				<span
					class="inline-flex size-20 items-center justify-center rounded-full bg-white/95 text-primary-700 shadow-2xl ring-1 ring-white/40 transition group-hover:scale-110 group-hover:bg-white sm:size-24"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="size-8 translate-x-0.5 sm:size-10">
						<path d="M8 5v14l11-7z" />
					</svg>
				</span>
			</div>

			<div class="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
				<span
					class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur"
				>
					<span class="size-1.5 rounded-full bg-primary-400"></span>
					360° Interactive Tour
				</span>
				<p class="mt-3 text-lg font-semibold sm:text-xl">Klik untuk memuat tur virtual</p>
				<p class="mt-1 max-w-xl text-sm text-neutral-200">
					Iframe baru dimuat setelah Anda klik agar halaman tetap ringan.
				</p>
			</div>
		</button>
	{/if}
</div>
