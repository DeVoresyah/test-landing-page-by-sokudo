<script lang="ts">
	import Container from './Container.svelte';
	import { reveal } from '../actions/reveal';
	import { stats } from '../config/site';
</script>

<section aria-label="Sekilas angka sekolah" class="relative -mt-12 sm:-mt-16">
	<Container>
		<div
			use:reveal
			class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 shadow-xl shadow-neutral-900/10 sm:grid-cols-4"
		>
			{#each stats as stat, i (stat.label)}
				<div
					use:reveal={{ delay: 80 * i }}
					class="flex flex-col gap-1 bg-white p-6 sm:p-7"
				>
					<dt class="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
						{stat.label}
					</dt>
					<dd
						class="bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl"
					>
						{stat.value}
					</dd>
					{#if stat.hint}
						<p class="text-sm text-neutral-500">{stat.hint}</p>
					{/if}
				</div>
			{/each}
		</div>
	</Container>
</section>
