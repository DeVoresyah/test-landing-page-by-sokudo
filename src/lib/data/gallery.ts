export type GalleryCategory = 'fasilitas' | 'kegiatan' | 'ekstrakurikuler' | 'acara';

export type GalleryItem = {
	id: string;
	src: string;
	srcset: string;
	width: number;
	height: number;
	alt: string;
	caption: string;
	category: GalleryCategory;
};

export const galleryCategories: { value: GalleryCategory | 'all'; label: string }[] = [
	{ value: 'all', label: 'Semua' },
	{ value: 'fasilitas', label: 'Fasilitas' },
	{ value: 'kegiatan', label: 'Kegiatan' },
	{ value: 'ekstrakurikuler', label: 'Ekstrakurikuler' },
	{ value: 'acara', label: 'Acara' }
];

// Placeholder images via picsum.photos (deterministic per-seed). Swap with
// real school photography before launch — keep `srcset` widths in sync if so.
const widths = [480, 800, 1200, 1600];

function picsum(seed: string, w: number, h: number) {
	const src = `https://picsum.photos/seed/${seed}/${w}/${h}`;
	const ratio = h / w;
	const srcset = widths
		.map((W) => `https://picsum.photos/seed/${seed}/${W}/${Math.round(W * ratio)} ${W}w`)
		.join(', ');
	return { src, srcset, width: w, height: h };
}

export const gallery: GalleryItem[] = [
	{
		id: 'lib-01',
		...picsum('hb-library', 1200, 800),
		alt: 'Perpustakaan modern dengan rak kayu dan ruang baca terang',
		caption: 'Perpustakaan dengan 12.000+ koleksi buku & ruang baca quiet zone',
		category: 'fasilitas'
	},
	{
		id: 'lab-01',
		...picsum('hb-science-lab', 1200, 900),
		alt: 'Laboratorium sains lengkap dengan alat eksperimen',
		caption: 'Laboratorium Sains terpadu (Fisika, Kimia, Biologi)',
		category: 'fasilitas'
	},
	{
		id: 'computer-01',
		...picsum('hb-computer-lab', 1200, 800),
		alt: 'Lab komputer dengan deretan PC modern',
		caption: 'Lab komputer & studio coding bertenaga workstation kelas atas',
		category: 'fasilitas'
	},
	{
		id: 'sport-hall-01',
		...picsum('hb-sport-hall', 1200, 700),
		alt: 'Lapangan olahraga indoor sekolah',
		caption: 'GOR multifungsi: basket, voli, futsal, dan badminton',
		category: 'fasilitas'
	},

	{
		id: 'class-01',
		...picsum('hb-classroom-discussion', 1200, 800),
		alt: 'Siswa berdiskusi kelompok di kelas',
		caption: 'Diskusi kelompok berbasis project-based learning',
		category: 'kegiatan'
	},
	{
		id: 'class-02',
		...picsum('hb-outdoor-learning', 1200, 800),
		alt: 'Pembelajaran luar ruang di taman sekolah',
		caption: 'Outdoor learning — biologi lapangan & literasi alam',
		category: 'kegiatan'
	},
	{
		id: 'class-03',
		...picsum('hb-presentation', 1200, 800),
		alt: 'Siswa mempresentasikan proyek di depan kelas',
		caption: 'Showcase proyek akhir semester',
		category: 'kegiatan'
	},

	{
		id: 'eskul-01',
		...picsum('hb-music-club', 1200, 800),
		alt: 'Anggota klub musik berlatih band',
		caption: 'Klub Musik — band, paduan suara, dan ansambel',
		category: 'ekstrakurikuler'
	},
	{
		id: 'eskul-02',
		...picsum('hb-robotics', 1200, 800),
		alt: 'Tim robotika sedang merakit robot',
		caption: 'Tim Robotika — juara kompetisi nasional 2024',
		category: 'ekstrakurikuler'
	},
	{
		id: 'eskul-03',
		...picsum('hb-basketball', 1200, 800),
		alt: 'Tim basket sekolah berlatih di lapangan',
		caption: 'Tim Basket Putra & Putri',
		category: 'ekstrakurikuler'
	},
	{
		id: 'eskul-04',
		...picsum('hb-art-club', 1200, 900),
		alt: 'Anggota klub seni melukis di studio',
		caption: 'Studio Seni Rupa & Desain',
		category: 'ekstrakurikuler'
	},

	{
		id: 'event-01',
		...picsum('hb-graduation', 1600, 900),
		alt: 'Upacara wisuda siswa dengan toga dan topi wisuda',
		caption: 'Wisuda Angkatan ke-31 — 312 lulusan diterima PTN/luar negeri',
		category: 'acara'
	},
	{
		id: 'event-02',
		...picsum('hb-festival', 1200, 800),
		alt: 'Panggung festival seni sekolah dengan penonton ramai',
		caption: 'Harapan Bangsa Festival — pentas seni & budaya tahunan',
		category: 'acara'
	},
	{
		id: 'event-03',
		...picsum('hb-science-fair', 1200, 800),
		alt: 'Pameran sains dengan beragam stan proyek siswa',
		caption: 'Science & Innovation Fair',
		category: 'acara'
	}
];
