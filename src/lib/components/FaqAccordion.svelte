<script lang="ts">
	import type { FaqItem } from '$lib/data/faq';

	type Props = {
		items: FaqItem[];
	};

	let { items }: Props = $props();

	let openId = $state<string | null>(null);

	function toggle(id: string) {
		openId = openId === id ? null : id;
	}
</script>

<ul class="divide-y divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
	{#each items as item (item.id)}
		{@const isOpen = openId === item.id}
		<li>
			<h3>
				<button
					type="button"
					id="faq-trigger-{item.id}"
					aria-expanded={isOpen}
					aria-controls="faq-panel-{item.id}"
					onclick={() => toggle(item.id)}
					class="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 sm:px-8 sm:py-6"
				>
					<span class="text-base font-semibold text-neutral-900 sm:text-lg">
						{item.question}
					</span>
					<span
						class="grid size-8 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700 transition-transform duration-normal {isOpen
							? 'rotate-180'
							: ''}"
						aria-hidden="true"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</span>
				</button>
			</h3>
			<div
				id="faq-panel-{item.id}"
				role="region"
				aria-labelledby="faq-trigger-{item.id}"
				hidden={!isOpen}
				class="px-6 pb-6 text-sm leading-relaxed text-neutral-600 sm:px-8 sm:pb-7 sm:text-base"
			>
				{item.answer}
			</div>
		</li>
	{/each}
</ul>
