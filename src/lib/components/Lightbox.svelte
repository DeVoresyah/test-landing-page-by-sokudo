<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import type { GalleryItem } from '$lib/data/gallery';

	type Props = {
		items: GalleryItem[];
		open: boolean;
		index: number;
		onClose: () => void;
		onIndexChange: (index: number) => void;
	};

	let { items, open, index, onClose, onIndexChange }: Props = $props();

	const current = $derived(items[index]);
	const hasItems = $derived(items.length > 0);
	const motionFast = 140;
	const motionNormal = 220;

	function prev() {
		if (!hasItems) return;
		onIndexChange((index - 1 + items.length) % items.length);
	}

	function next() {
		if (!hasItems) return;
		onIndexChange((index + 1) % items.length);
	}

	function onKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			onClose();
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			prev();
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			next();
		}
	}

	$effect(() => {
		if (!open) return;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prevOverflow;
		};
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if open && current}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center"
		role="dialog"
		aria-modal="true"
		aria-label="Pratinjau galeri"
	>
		<button
			type="button"
			class="absolute inset-0 cursor-zoom-out bg-neutral-950/85 backdrop-blur-sm"
			aria-label="Tutup pratinjau"
			onclick={onClose}
			transition:fade={{ duration: motionFast }}
		></button>

		<div
			class="relative z-10 flex max-h-[92vh] w-[min(92vw,1200px)] flex-col items-center gap-4"
			transition:scale={{ duration: motionNormal, start: 0.96, opacity: 0 }}
		>
			<button
				type="button"
				class="absolute right-0 -top-12 inline-flex size-10 items-center justify-center rounded-full border border-primary-500 bg-white text-primary-600 transition hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
				aria-label="Tutup"
				onclick={onClose}
			>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-5"
					><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" /></svg
				>
			</button>

			{#key current.id}
				<figure
					class="relative flex max-h-[78vh] w-full items-center justify-center overflow-hidden rounded-[14px] bg-neutral-900"
					in:fade={{ duration: motionFast }}
				>
					<img
						src={current.src}
						srcset={current.srcset}
						sizes="(min-width: 1024px) 1100px, 92vw"
						alt={current.alt}
						width={current.width}
						height={current.height}
						class="max-h-[78vh] w-auto object-contain"
					/>
					<figcaption
						class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/90 to-transparent p-5 text-sm text-neutral-100 sm:p-6 sm:text-base"
					>
						<p class="font-semibold">{current.caption}</p>
						<p class="mt-1 text-xs text-neutral-300">
							{index + 1} / {items.length}
						</p>
					</figcaption>
				</figure>
			{/key}

			{#if items.length > 1}
				<button
					type="button"
					class="absolute left-2 top-1/2 -translate-y-1/2 inline-flex size-12 items-center justify-center rounded-full border border-primary-500 bg-white text-primary-600 transition hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4"
					aria-label="Sebelumnya"
					onclick={prev}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-5"
						><path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" /></svg
					>
				</button>
				<button
					type="button"
					class="absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-12 items-center justify-center rounded-full border border-primary-500 bg-white text-primary-600 transition hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4"
					aria-label="Berikutnya"
					onclick={next}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-5"
						><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" /></svg
					>
				</button>

				{#if items.length <= 10}
					<div
						class="flex items-center gap-1.5"
						role="tablist"
						aria-label="Pilih foto"
					>
						{#each items as it, i (it.id)}
							{@const isActive = i === index}
							<button
								type="button"
								role="tab"
								aria-selected={isActive}
								aria-label="Foto {i + 1}"
								onclick={() => onIndexChange(i)}
								class="h-1.5 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white {isActive
									? 'w-6 bg-primary-500'
									: 'w-1.5 bg-neutral-400/70 hover:bg-neutral-300'}"
							></button>
						{/each}
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}
