export type Program = {
	id: string;
	name: string;
	tagline: string;
	description: string;
	href: string;
	tone: 'primary' | 'secondary';
	// Inline SVG path data drawn on a 24×24 viewBox, stroke-only (matches lucide style).
	iconPath: string;
};

// Placeholder content — flagged in handoff. Swap with curriculum-team-approved
// copy and per-program landing pages before launch.
export const programs: Program[] = [
	{
		id: 'ipa',
		name: 'IPA',
		tagline: 'Sains & Teknologi',
		description:
			'Penjurusan Matematika & Ilmu Alam dengan laboratorium lengkap, riset siswa, dan persiapan olimpiade nasional.',
		href: '#pendaftaran',
		tone: 'primary',
		iconPath:
			'M9 3h6M10 3v4l-5 9a4 4 0 0 0 3.5 6h7a4 4 0 0 0 3.5-6l-5-9V3M8 14h8'
	},
	{
		id: 'ips',
		name: 'IPS',
		tagline: 'Sosial & Humaniora',
		description:
			'Ekonomi, Sosiologi, Geografi, dan Sejarah dengan pembelajaran berbasis kasus dan kolaborasi komunitas.',
		href: '#pendaftaran',
		tone: 'secondary',
		iconPath:
			'M3 21h18M5 21V8l7-5 7 5v13M9 12h2M13 12h2M9 16h2M13 16h2'
	},
	{
		id: 'bahasa',
		name: 'Bahasa',
		tagline: 'Linguistik & Budaya',
		description:
			'Bahasa Indonesia, Inggris, dan Mandarin dengan kelas debat, sastra, dan pertukaran budaya internasional.',
		href: '#pendaftaran',
		tone: 'primary',
		iconPath:
			'M5 8h6M8 5v3M5 8c0 5 3 7 6 8M11 16c-2 0-3-1-3-3M13 21l5-12 5 12M15 17h6'
	},
	{
		id: 'akselerasi',
		name: 'Akselerasi',
		tagline: 'Program Cepat 2 Tahun',
		description:
			'Jalur percepatan untuk siswa berprestasi tinggi — kurikulum padat, mentor pribadi, dan persiapan PTN dini.',
		href: '#pendaftaran',
		tone: 'secondary',
		iconPath: 'M13 2 3 14h8l-1 8 10-12h-8l1-8Z'
	}
];
