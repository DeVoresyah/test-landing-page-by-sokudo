export type AchievementLevel = 'kabupaten' | 'provinsi' | 'nasional' | 'internasional';

export type Achievement = {
	id: string;
	title: string;
	awardee: string;
	year: number;
	level: AchievementLevel;
	category: string;
	featured?: boolean;
};

// Tailwind class map for the level badge — colocated because this section is
// the only consumer.
export const levelStyles: Record<AchievementLevel, string> = {
	kabupaten: 'border-neutral-200 bg-neutral-100 text-neutral-700',
	provinsi: 'border-secondary-200 bg-secondary-50 text-secondary-700',
	nasional: 'border-primary-200 bg-primary-50 text-primary-700',
	internasional: 'border-amber-200 bg-amber-50 text-amber-800'
};

export const levelLabels: Record<AchievementLevel, string> = {
	kabupaten: 'Kabupaten',
	provinsi: 'Provinsi',
	nasional: 'Nasional',
	internasional: 'Internasional'
};

// Placeholder content — flagged in handoff. Replace with verified records from
// kesiswaan/humas before launch.
export const achievements: Achievement[] = [
	{
		id: 'oksn-2024',
		title: 'Juara 1 Olimpiade Sains Nasional — Bidang Fisika',
		awardee: 'Tim Olimpiade Fisika',
		year: 2024,
		level: 'nasional',
		category: 'Akademik',
		featured: true
	},
	{
		id: 'robotik-2024',
		title: 'Medali Emas Kompetisi Robotika Nasional',
		awardee: 'Tim Robotika Harapan Bangsa',
		year: 2024,
		level: 'nasional',
		category: 'STEM'
	},
	{
		id: 'debat-2024',
		title: 'Juara 2 Lomba Debat Bahasa Inggris',
		awardee: 'Aisyah & Rendra (XI IPA)',
		year: 2024,
		level: 'provinsi',
		category: 'Bahasa'
	},
	{
		id: 'futsal-2024',
		title: 'Juara 1 Liga Futsal Pelajar',
		awardee: 'Tim Futsal Putra',
		year: 2024,
		level: 'kabupaten',
		category: 'Olahraga'
	},
	{
		id: 'matematika-2023',
		title: 'Perak Asia Pacific Mathematics Olympiad',
		awardee: 'Bagas Pratama (XII IPA)',
		year: 2023,
		level: 'internasional',
		category: 'Akademik'
	},
	{
		id: 'paduan-suara-2023',
		title: 'Juara 1 Festival Paduan Suara Pelajar',
		awardee: 'Choir Harapan Bangsa',
		year: 2023,
		level: 'provinsi',
		category: 'Seni'
	},
	{
		id: 'karya-tulis-2023',
		title: 'Juara 3 Lomba Karya Tulis Ilmiah Nasional',
		awardee: 'Tim Riset Sosial',
		year: 2023,
		level: 'nasional',
		category: 'Akademik'
	}
];
