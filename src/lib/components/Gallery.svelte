<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import {
		gallery,
		galleryCategories,
		type GalleryCategory,
		type GalleryItem
	} from '$lib/data/gallery';
	import Lightbox from './Lightbox.svelte';

	type Filter = GalleryCategory | 'all';

	let active = $state<Filter>('all');
	let lightboxOpen = $state(false);
	let lightboxIndex = $state(0);

	const visible = $derived<GalleryItem[]>(
		active === 'all' ? gallery : gallery.filter((g) => g.category === active)
	);
	const motionNormal = 220;

	function openAt(item: GalleryItem) {
		const i = visible.findIndex((g) => g.id === item.id);
		lightboxIndex = i < 0 ? 0 : i;
		lightboxOpen = true;
	}

	// Bento-ish span pattern keyed by index — gives the grid visual rhythm.
	const spanFor = (i: number) => {
		const m = i % 6;
		if (m === 0) return 'sm:col-span-2 sm:row-span-2';
		if (m === 3) return 'sm:row-span-2';
		return '';
	};
</script>

<div>
	<div
		class="flex flex-wrap items-center gap-2"
		role="tablist"
		aria-label="Kategori galeri"
	>
		{#each galleryCategories as cat (cat.value)}
			{@const isActive = active === cat.value}
			<button
				type="button"
				role="tab"
				aria-selected={isActive}
				class="rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 {isActive
					? 'bg-neutral-900 text-white shadow-sm'
					: 'border border-neutral-200 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-700'}"
				onclick={() => (active = cat.value)}
			>
				{cat.label}
			</button>
		{/each}
	</div>

	<div
		class="mt-8 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
	>
		{#each visible as item, i (item.id)}
			<button
				type="button"
				class="group relative overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/70 transition hover:ring-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 {spanFor(
					i
				)}"
				onclick={() => openAt(item)}
				aria-label="Lihat {item.caption}"
				in:fade={{ duration: motionNormal, delay: 30 }}
				animate:flip={{ duration: motionNormal }}
			>
				<img
					src={item.src}
					srcset={item.srcset}
					sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
					alt={item.alt}
					width={item.width}
					height={item.height}
					loading="lazy"
					decoding="async"
					class="absolute inset-0 size-full object-cover transition duration-normal group-hover:scale-105"
				/>
				<div
					class="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/10 to-transparent opacity-90 transition group-hover:opacity-100"
				></div>
				<div class="absolute inset-x-3 bottom-3 text-left text-white sm:inset-x-4 sm:bottom-4">
					<p class="font-mono text-xs font-semibold uppercase tracking-wider text-primary-200">
						{galleryCategories.find((c) => c.value === item.category)?.label}
					</p>
					<p class="mt-1 line-clamp-2 text-sm font-semibold sm:text-base">{item.caption}</p>
				</div>
				<span
					class="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-white/85 text-neutral-900 opacity-0 ring-1 ring-white/40 backdrop-blur transition group-hover:opacity-100 sm:right-4 sm:top-4"
					aria-hidden="true"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4"
						><path
							d="M21 21l-4.3-4.3M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM10 7v6M7 10h6"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</span>
			</button>
		{/each}
	</div>

	{#if visible.length === 0}
		<p class="mt-8 text-center text-sm text-neutral-500">Belum ada foto pada kategori ini.</p>
	{/if}
</div>

<Lightbox
	items={visible}
	open={lightboxOpen}
	index={lightboxIndex}
	onClose={() => (lightboxOpen = false)}
	onIndexChange={(i) => (lightboxIndex = i)}
/>
