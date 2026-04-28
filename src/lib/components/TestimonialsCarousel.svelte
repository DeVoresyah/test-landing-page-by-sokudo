<script lang="ts">
	import Container from './Container.svelte';
	import { reveal } from '../actions/reveal';
	import SectionHeading from './SectionHeading.svelte';

	export type Testimonial = {
		id: string;
		body: string;
		name: string;
		role: string;
		avatar?: string;
		rating?: number;
	};

	type Props = {
		eyebrow?: string;
		title?: string;
		description?: string;
		testimonials: Testimonial[];
		id?: string;
		class?: string;
	};

	let {
		eyebrow = 'Testimoni',
		title = 'Kata mereka tentang SMA Harapan Bangsa',
		description,
		testimonials,
		id,
		class: className = ''
	}: Props = $props();

	let scroller = $state<HTMLDivElement | null>(null);
	let activeIndex = $state(0);
	const ratingStars = [0, 1, 2, 3, 4];

	function scrollByCard(direction: 1 | -1) {
		if (!scroller) return;
		const card = scroller.querySelector<HTMLElement>('[data-testimonial]');
		const step = card ? card.offsetWidth + 24 : scroller.clientWidth * 0.85;
		scroller.scrollBy({ left: direction * step, behavior: 'smooth' });
	}

	function onScroll() {
		if (!scroller) return;
		const card = scroller.querySelector<HTMLElement>('[data-testimonial]');
		const step = card ? card.offsetWidth + 24 : scroller.clientWidth;
		activeIndex = Math.min(
			testimonials.length - 1,
			Math.max(0, Math.round(scroller.scrollLeft / step))
		);
	}

	function jumpTo(i: number) {
		if (!scroller) return;
		const card = scroller.querySelector<HTMLElement>('[data-testimonial]');
		const step = card ? card.offsetWidth + 24 : scroller.clientWidth;
		scroller.scrollTo({ left: i * step, behavior: 'smooth' });
	}
</script>

<section {id} aria-label={title} class="bg-neutral-50 py-16 lg:py-24 {className}">
	<Container>
		<div use:reveal class="flex flex-col gap-10">
			<div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
				<SectionHeading {eyebrow} {title} {description} />

				<div class="flex items-center gap-3 self-start sm:self-end">
					<button
						type="button"
						aria-label="Testimoni sebelumnya"
						onclick={() => scrollByCard(-1)}
						class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary-600 bg-white text-primary-600 transition hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="h-5 w-5"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 6l-6 6 6 6" />
						</svg>
					</button>
					<button
						type="button"
						aria-label="Testimoni berikutnya"
						onclick={() => scrollByCard(1)}
						class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary-600 bg-white text-primary-600 transition hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="h-5 w-5"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
						</svg>
					</button>
				</div>
			</div>

			<div
				bind:this={scroller}
				onscroll={onScroll}
				class="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-16 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			>
				{#each testimonials as t (t.id)}
					<article
						data-testimonial
						class="flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-[14px] border border-neutral-200 bg-neutral-100 p-7 sm:w-[60%] lg:w-[40%]"
					>
						{#if typeof t.rating === 'number'}
							<div class="flex items-center gap-1 text-warm-500" aria-label="Rating {t.rating} dari 5">
								{#each ratingStars as s}
									<svg
										viewBox="0 0 20 20"
										fill={s < (t.rating ?? 0) ? 'currentColor' : 'none'}
										stroke="currentColor"
										stroke-width="1.5"
										class="h-4 w-4"
										aria-hidden="true"
									>
										<path
											stroke-linejoin="round"
											d="M10 2.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 14.77l-4.78 2.51.91-5.32-3.86-3.76 5.34-.78L10 2.5z"
										/>
									</svg>
								{/each}
							</div>
						{/if}
						<p class="text-pretty text-base leading-relaxed text-neutral-800">
							"{t.body}"
						</p>
						<div class="mt-auto flex items-center gap-3 border-t border-neutral-200 pt-5">
							{#if t.avatar}
								<img
									src={t.avatar}
									alt=""
									loading="lazy"
									class="h-11 w-11 rounded-full object-cover"
								/>
							{:else}
								<span
									class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700"
									aria-hidden="true"
								>
									{t.name.charAt(0)}
								</span>
							{/if}
							<div class="flex flex-col leading-tight">
								<span class="text-sm font-semibold text-neutral-900">{t.name}</span>
								<span class="text-xs text-neutral-500">{t.role}</span>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<div class="flex items-center justify-center gap-2" role="tablist" aria-label="Pagination testimoni">
				{#each testimonials as t, i (t.id)}
					{#if i === activeIndex}
						<button
							type="button"
							role="tab"
							aria-selected="true"
							aria-label="Testimoni {i + 1}"
							onclick={() => jumpTo(i)}
							class="h-2 w-6 rounded-full bg-primary-500 transition"
						></button>
					{:else}
						<button
							type="button"
							role="tab"
							aria-selected="false"
							aria-label="Testimoni {i + 1}"
							onclick={() => jumpTo(i)}
							class="h-2 w-2 rounded-full bg-neutral-300 transition hover:bg-neutral-400"
						></button>
					{/if}
				{/each}
			</div>
		</div>
	</Container>
</section>
