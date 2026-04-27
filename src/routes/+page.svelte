<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import StatsStrip from '$lib/components/StatsStrip.svelte';
	import { site } from '$lib/config/site';
</script>

<svelte:head>
	<title>{site.name} — {site.tagline}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<Hero />
<StatsStrip />
<About />
