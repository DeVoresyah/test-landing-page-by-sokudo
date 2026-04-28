<script lang="ts">
	import DarkFeatureBand, { type DarkFeatureItem } from './DarkFeatureBand.svelte';
	import { programs } from '../data/programs';

	const features: DarkFeatureItem[] = programs.map((p) => ({
		title: `${p.name} — ${p.tagline}`,
		description: p.description
	}));
</script>

<DarkFeatureBand
	id="program"
	eyebrow="Program"
	title="Jalur belajar yang sesuai minat dan masa depan"
	description="Pilih penjurusan yang paling sesuai dengan kekuatan dan cita-cita putra-putri Anda — setiap program didukung guru spesialis, fasilitas memadai, dan jejaring industri."
	{features}
	imageAlt="Suasana belajar di laboratorium SMA Harapan Bangsa"
/>
