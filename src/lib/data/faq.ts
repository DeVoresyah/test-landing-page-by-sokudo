export type FaqItem = {
	id: string;
	question: string;
	answer: string;
};

export const faqs: FaqItem[] = [
	{
		id: 'ppdb-jadwal',
		question: 'Kapan jadwal Penerimaan Peserta Didik Baru (PPDB) dibuka?',
		answer:
			'PPDB tahun ajaran 2026/2027 dibuka mulai 5 Januari 2026 dan ditutup 30 April 2026. Pendaftaran dilakukan secara daring melalui portal resmi sekolah, dengan tiga gelombang seleksi: prestasi, akademik, dan reguler.'
	},
	{
		id: 'biaya',
		question: 'Berapa biaya pendidikan dan apakah ada program beasiswa?',
		answer:
			'Biaya pendidikan terdiri dari uang pangkal sekali bayar dan SPP bulanan, dengan rincian dapat diunduh di halaman pendaftaran. Tersedia beasiswa prestasi akademik, non-akademik, dan beasiswa keluarga kurang mampu hingga 100% biaya pendidikan.'
	},
	{
		id: 'kurikulum',
		question: 'Kurikulum apa yang digunakan?',
		answer:
			'Kami menerapkan Kurikulum Merdeka yang diperkaya dengan pendekatan project-based learning, kelas berbasis minat (peminatan), serta program bahasa Inggris dan Mandarin terpadu. Beberapa mata pelajaran diajarkan dalam dua bahasa.'
	},
	{
		id: 'ekstrakurikuler',
		question: 'Apa saja kegiatan ekstrakurikuler yang tersedia?',
		answer:
			'Lebih dari 24 ekstrakurikuler aktif: robotika, basket, futsal, paskibra, pramuka, tari tradisional, paduan suara, klub sains, klub debat bahasa Inggris, jurnalistik, fotografi, hingga e-sport. Setiap siswa wajib mengambil minimal satu ekstrakurikuler.'
	},
	{
		id: 'fasilitas',
		question: 'Apa saja fasilitas yang dimiliki sekolah?',
		answer:
			'Sekolah memiliki laboratorium IPA, lab komputer, lab bahasa, perpustakaan digital, studio seni, lapangan olahraga indoor & outdoor, kantin sehat, masjid, klinik, serta ruang kelas ber-AC dengan smartboard. Seluruh area dilengkapi Wi-Fi dan CCTV.'
	},
	{
		id: 'transportasi',
		question: 'Apakah tersedia layanan antar-jemput?',
		answer:
			'Ya, kami menyediakan layanan bus antar-jemput dengan rute yang mencakup wilayah Jakarta Selatan, Jakarta Pusat, Depok, dan Tangerang Selatan. Pendaftaran transportasi dilakukan terpisah saat siswa diterima.'
	},
	{
		id: 'tour',
		question: 'Bisakah orang tua melakukan kunjungan sekolah sebelum mendaftar?',
		answer:
			'Tentu. Kami mengadakan Open House setiap bulan dan kunjungan privat dengan janji temu di hari kerja. Daftar melalui formulir kontak di halaman ini atau hubungi kami via WhatsApp untuk mengatur jadwal.'
	}
];
