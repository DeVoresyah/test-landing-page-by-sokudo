<script lang="ts">
	import { site } from '$lib/config/site';

	type Props = {
		tone?: 'default' | 'invert' | 'flat';
		size?: 'sm' | 'md';
	};

	let { tone = 'default', size = 'md' }: Props = $props();

	const text = $derived(
		tone === 'invert' ? 'text-white' : tone === 'flat' ? 'text-neutral-900' : 'text-primary-700'
	);
	const markStyle = $derived(
		tone === 'flat'
			? 'bg-primary-600 text-white'
			: 'bg-gradient-to-br from-primary-500 to-panel-800 text-white shadow-md shadow-primary-500/30'
	);
	const mark = $derived(size === 'sm' ? 'size-8 text-sm' : 'size-9 text-base');
	const label = $derived(size === 'sm' ? 'text-base' : 'text-lg');
</script>

<a href="/" class="flex items-center gap-2 font-bold {text}" aria-label={site.name}>
	<span class="grid {mark} place-items-center rounded-xl font-bold {markStyle}">
		{site.logoMark}
	</span>
	<span class="tracking-tight {label}">{site.shortName}</span>
</a>
