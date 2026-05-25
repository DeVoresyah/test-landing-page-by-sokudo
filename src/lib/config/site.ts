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
	href: '/register'
};

export const ctaSecondary = {
	label: 'Pelajari Lebih Lanjut',
	href: '#tentang'
};

export type Stat = {
	label: string;
	value: string;
	hint?: string;
};

export const stats: Stat[] = [
	{ label: 'Siswa aktif', value: '1.240+', hint: 'Lintas angkatan X — XII' },
	{ label: 'Guru & staf', value: '86', hint: '92% bersertifikasi' },
	{ label: 'Tahun berdiri', value: '1992', hint: 'Tiga dekade berdedikasi' },
	{ label: 'Akreditasi', value: 'A', hint: 'BAN-S/M, periode 2023' }
];

export const principal = {
	name: 'Dr. Siti Rahmawati, M.Pd.',
	title: 'Kepala Sekolah',
	photo: '/placeholders/principal.svg',
	greeting:
		'Assalamualaikum dan salam sejahtera. Selamat datang di SMA Harapan Bangsa — rumah belajar bagi generasi yang berani bertanya, berkarya, dan memberi dampak. Kami percaya pendidikan terbaik lahir dari kolaborasi guru, siswa, dan keluarga; karena itu setiap ruang di sekolah ini kami rancang untuk menumbuhkan rasa ingin tahu, karakter, dan keberanian mencoba.'
};

export const visi =
	'Menjadi sekolah unggul yang melahirkan pelajar Pancasila yang berakhlak, berdaya pikir kritis, dan siap berkontribusi di tingkat global.';

export const misi: string[] = [
	'Menyelenggarakan pembelajaran berbasis proyek yang menumbuhkan rasa ingin tahu dan kemandirian.',
	'Mengembangkan karakter, kepemimpinan, dan kepedulian sosial melalui ekosistem ko-kurikuler.',
	'Membangun kemitraan dengan industri, perguruan tinggi, dan komunitas untuk pengalaman belajar yang nyata.',
	'Mendorong literasi digital, sains, dan bahasa asing agar siswa siap berkompetisi secara global.'
];

export const sejarah = {
	headline: 'Tiga dekade menumbuhkan generasi pembelajar.',
	body: 'Berdiri pada tahun 1992 dengan dua kelas dan tiga puluh siswa, SMA Harapan Bangsa tumbuh menjadi sekolah pilihan keluarga di Jakarta Selatan. Lewat pembaruan kurikulum, investasi pada guru, dan budaya belajar yang kolaboratif, kami konsisten menorehkan prestasi akademik dan non-akademik tanpa kehilangan ruh sekolah negeri yang inklusif dan ramah.',
	image: '/placeholders/history.svg'
};

// Virtual tour embed — placeholder Google Maps location of the school address.
// Replace with the real Matterport / Pannellum / YouTube-360 URL once available.
export const virtualTour = {
	embedUrl:
		'https://maps.google.com/maps?q=Jl.%20Pendidikan%20Raya%20Jakarta%20Selatan&t=&z=16&ie=UTF8&iwloc=&output=embed',
	title: 'Tur Virtual SMA Harapan Bangsa'
};
