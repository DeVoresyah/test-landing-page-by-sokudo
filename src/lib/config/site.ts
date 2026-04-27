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
