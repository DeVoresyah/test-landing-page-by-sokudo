<script lang="ts">
	import { site } from '$lib/config/site';

	type Props = {
		tone?: 'default' | 'invert';
		size?: 'sm' | 'md';
	};

	let { tone = 'default', size = 'md' }: Props = $props();

	const text = $derived(tone === 'invert' ? 'text-white' : 'text-primary-700');
	const mark = $derived(size === 'sm' ? 'size-8 text-sm' : 'size-9 text-base');
	const label = $derived(size === 'sm' ? 'text-base' : 'text-lg');
</script>

<a href="/" class="flex items-center gap-2 font-bold {text}" aria-label={site.name}>
	<span
		class="grid {mark} place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 font-bold text-white shadow-md shadow-primary-500/30"
	>
		{site.logoMark}
	</span>
	<span class="tracking-tight {label}">{site.shortName}</span>
</a>
