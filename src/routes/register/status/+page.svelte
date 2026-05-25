<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import { getSupabaseClient } from '$lib/supabase/client';
	import { requireSession } from '$lib/auth/session.svelte';
	import { fetchMyRegistration, type Registration } from '$lib/supabase/registrations';

	let { data } = $props();

	let loading = $state(true);
	let configMissing = $state(false);
	let loadError = $state('');
	let registration = $state<Registration | null>(null);

	onMount(async () => {
		if (!data.supabase) {
			configMissing = true;
			loading = false;
			return;
		}

		const session = await requireSession(data.supabase, $page.url.pathname);
		if (!session) return;

		const supabase = getSupabaseClient(data.supabase);
		const { data: existing, error } = await fetchMyRegistration(supabase, session.user.id);

		if (error) {
			loadError = 'Gagal memuat data pendaftaran. Muat ulang halaman untuk mencoba lagi.';
		} else {
			registration = existing;
		}

		loading = false;
	});

	const genderLabel: Record<'male' | 'female', string> = {
		male: 'Laki-laki',
		female: 'Perempuan'
	};

	const dateFmt = new Intl.DateTimeFormat('id-ID', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

	function formatDate(iso: string): string {
		// birth_date is a plain YYYY-MM-DD; parse as local to avoid TZ shift.
		const [y, m, d] = iso.split('-').map(Number);
		if (!y || !m || !d) return iso;
		return dateFmt.format(new Date(y, m - 1, d));
	}

	function formatTimestamp(iso: string): string {
		const dt = new Date(iso);
		return Number.isNaN(dt.getTime()) ? iso : dateFmt.format(dt);
	}

	type Row = { label: string; value: string };

	const personal = $derived.by<Row[]>(() => {
		const r = registration;
		if (!r) return [];
		return [
			{ label: 'Nama lengkap', value: r.full_name },
			{ label: 'NISN', value: r.nisn },
			{ label: 'Jenis kelamin', value: genderLabel[r.gender] },
			{ label: 'Tempat lahir', value: r.birth_place },
			{ label: 'Tanggal lahir', value: formatDate(r.birth_date) },
			{ label: 'Email', value: r.email },
			{ label: 'Nomor telepon', value: r.phone },
			{ label: 'Alamat domisili', value: r.address },
			{ label: 'Asal sekolah', value: r.prior_school },
			{ label: 'Program pilihan', value: r.target_program }
		];
	});

	const father = $derived.by<Row[]>(() => {
		const r = registration;
		if (!r) return [];
		return [
			{ label: 'Nama', value: r.father_name },
			{ label: 'Pekerjaan', value: r.father_occupation },
			{ label: 'Nomor telepon', value: r.father_phone },
			{ label: 'Email', value: r.father_email ?? '—' },
			{ label: 'Alamat', value: r.father_address }
		];
	});

	const mother = $derived.by<Row[]>(() => {
		const r = registration;
		if (!r) return [];
		return [
			{ label: 'Nama', value: r.mother_name },
			{ label: 'Pekerjaan', value: r.mother_occupation },
			{ label: 'Nomor telepon', value: r.mother_phone },
			{ label: 'Email', value: r.mother_email ?? '—' },
			{ label: 'Alamat', value: r.mother_address }
		];
	});
</script>

<svelte:head>
	<title>Status Pendaftaran — SMA Harapan Bangsa</title>
	<meta name="description" content="Lihat ringkasan data pendaftaran siswa baru yang telah Anda kirim." />
</svelte:head>

{#snippet section(title: string, index: string, rows: Row[])}
	<div class="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-card lg:p-8">
		<h2 class="text-base font-semibold text-neutral-900">
			<span class="mr-2 text-xs font-semibold tracking-[0.18em] text-primary-700 uppercase">{index}</span>
			{title}
		</h2>
		<dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">
			{#each rows as row (row.label)}
				<div>
					<dt class="text-xs font-semibold tracking-wide text-neutral-500 uppercase">{row.label}</dt>
					<dd class="mt-1 text-sm whitespace-pre-line text-neutral-900">{row.value}</dd>
				</div>
			{/each}
		</dl>
	</div>
{/snippet}

<section class="bg-neutral-50 py-10 lg:py-18">
	<Container size="md">
		<div class="flex flex-col gap-3">
			<span class="text-xs font-semibold tracking-[0.18em] text-primary-700 uppercase">
				PPDB 2026 / 2027
			</span>
			<h1 class="text-balance text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
				Status Pendaftaran
			</h1>
		</div>

		{#if configMissing}
			<div
				role="alert"
				class="mt-8 rounded-md border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800"
			>
				Konfigurasi Supabase belum tersedia. Hubungi admin sekolah.
			</div>
		{:else if loading}
			<div class="mt-12 flex items-center gap-3 text-sm text-neutral-500">
				<div
					class="size-5 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-500"
				></div>
				Memuat data pendaftaran…
			</div>
		{:else if loadError}
			<div
				role="alert"
				class="mt-8 rounded-md border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800"
			>
				{loadError}
			</div>
		{:else if !registration}
			<div class="mt-8 rounded-lg bg-white p-8 text-center shadow-card">
				<p class="text-base font-semibold text-neutral-900">Belum ada pendaftaran</p>
				<p class="mx-auto mt-2 max-w-md text-sm text-neutral-600">
					Anda belum mengirim formulir pendaftaran. Lengkapi data pribadi dan data orang tua untuk
					memulai proses penerimaan.
				</p>
				<div class="mt-6 flex justify-center">
					<Button href="/register" size="lg">Isi Formulir Pendaftaran</Button>
				</div>
			</div>
		{:else}
			<div
				role="status"
				class="mt-8 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900"
			>
				<p class="font-semibold">Pendaftaran Anda telah diterima.</p>
				<p class="mt-1 text-emerald-800">
					Terakhir diperbarui {formatTimestamp(registration.updated_at)}. Anda dapat memperbarui
					data selama masa pendaftaran.
				</p>
			</div>

			<div class="mt-8 flex flex-col gap-6">
				{@render section('Data Pribadi Calon Siswa', '01', personal)}
				{@render section('Data Ayah / Wali Pria', '02', father)}
				{@render section('Data Ibu / Wali Wanita', '03', mother)}
			</div>

			<div class="mt-8 flex flex-wrap items-center gap-4">
				<Button href="/register" size="lg">Perbarui Data</Button>
				<p class="text-xs text-neutral-500">
					Perubahan akan menggantikan data yang tersimpan saat ini.
				</p>
			</div>
		{/if}
	</Container>
</section>
