export type NavItem = {
	label: string;
	href: string;
};

export const site = {
	name: 'SMA Harapan Bangsa',
	shortName: 'Harapan Bangsa',
	logoMark: 'H',
	tagline: 'Belajar, Tumbuh, Berdampak',
	description:
		'Sekolah menengah atas modern dengan kurikulum bertaraf internasional dan ekosistem belajar yang menumbuhkan.',
	address: {
		street: 'Jl. Pendidikan Raya No. 88',
		city: 'Jakarta Selatan',
		postal: 'DKI Jakarta 12430',
		country: 'Indonesia'
	},
	contact: {
		phone: '+62 21 7654 3210',
		whatsapp: '+62 812 3456 7890',
		email: 'halo@smaharapanbangsa.sch.id'
	},
	hours: [
		{ days: 'Senin – Jumat', time: '07.00 – 16.00 WIB' },
		{ days: 'Sabtu', time: '07.00 – 12.00 WIB' },
		{ days: 'Minggu & Libur Nasional', time: 'Tutup' }
	],
	mapsQuery: 'SMA Harapan Bangsa, Jl. Pendidikan Raya No. 88, Jakarta Selatan',
	social: [
		{ label: 'Instagram', href: 'https://instagram.com/smaharapanbangsa' },
		{ label: 'YouTube', href: 'https://youtube.com/@smaharapanbangsa' },
		{ label: 'TikTok', href: 'https://tiktok.com/@smaharapanbangsa' },
		{ label: 'Facebook', href: 'https://facebook.com/smaharapanbangsa' }
	]
} as const;

export const nav: NavItem[] = [
	{ label: 'Beranda', href: '#beranda' },
	{ label: 'Tentang', href: '#tentang' },
	{ label: 'Program', href: '#program' },
	{ label: 'Galeri', href: '#galeri' },
	{ label: 'Prestasi', href: '#prestasi' },
	{ label: 'FAQ', href: '#faq' },
	{ label: 'Kontak', href: '#kontak' }
];

export const ctaPrimary = {
	label: 'Daftar Sekarang',
	href: '#pendaftaran'
};

// Virtual tour embed — placeholder Google Maps location of the school address.
// Replace with the real Matterport / Pannellum / YouTube-360 URL once available.
export const virtualTour = {
	embedUrl:
		'https://maps.google.com/maps?q=Jl.%20Pendidikan%20Raya%20Jakarta%20Selatan&t=&z=16&ie=UTF8&iwloc=&output=embed',
	title: 'Tur Virtual SMA Harapan Bangsa'
};
