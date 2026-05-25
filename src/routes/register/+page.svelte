<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import { programs } from '$lib/data/programs';
	import { getSupabaseClient } from '$lib/supabase/client';
	import { requireSession } from '$lib/auth/session.svelte';
	import {
		describeRegistrationError,
		fetchMyRegistration,
		saveMyRegistration,
		type Registration,
		type RegistrationInput
	} from '$lib/supabase/registrations';

	let { data } = $props();

	type Values = {
		full_name: string;
		nisn: string;
		birth_place: string;
		birth_date: string;
		gender: '' | 'male' | 'female';
		address: string;
		phone: string;
		email: string;
		prior_school: string;
		target_program: string;

		father_name: string;
		father_occupation: string;
		father_phone: string;
		father_email: string;
		father_address: string;

		mother_name: string;
		mother_occupation: string;
		mother_phone: string;
		mother_email: string;
		mother_address: string;
	};

	type Errors = Partial<Record<keyof Values, string>>;
	type Touched = Partial<Record<keyof Values, boolean>>;

	const initialValues: Values = {
		full_name: '',
		nisn: '',
		birth_place: '',
		birth_date: '',
		gender: '',
		address: '',
		phone: '',
		email: '',
		prior_school: '',
		target_program: '',
		father_name: '',
		father_occupation: '',
		father_phone: '',
		father_email: '',
		father_address: '',
		mother_name: '',
		mother_occupation: '',
		mother_phone: '',
		mother_email: '',
		mother_address: ''
	};

	let values = $state<Values>({ ...initialValues });
	let touched = $state<Touched>({});
	let submitAttempted = $state(false);
	let submitting = $state(false);
	let submitted = $state(false);

	// Page-level lifecycle: gating on auth, loading the existing row, and
	// surfacing server errors that aren't tied to a single field.
	let loading = $state(true);
	let configMissing = $state(false);
	let serverError = $state('');
	let isReturning = $state(false);

	function fillFrom(reg: Registration) {
		values = {
			full_name: reg.full_name,
			nisn: reg.nisn,
			birth_place: reg.birth_place,
			birth_date: reg.birth_date,
			gender: reg.gender,
			address: reg.address,
			phone: reg.phone,
			email: reg.email,
			prior_school: reg.prior_school,
			target_program: reg.target_program,
			father_name: reg.father_name,
			father_occupation: reg.father_occupation,
			father_phone: reg.father_phone,
			father_email: reg.father_email ?? '',
			father_address: reg.father_address,
			mother_name: reg.mother_name,
			mother_occupation: reg.mother_occupation,
			mother_phone: reg.mother_phone,
			mother_email: reg.mother_email ?? '',
			mother_address: reg.mother_address
		};
	}

	onMount(async () => {
		if (!data.supabase) {
			configMissing = true;
			loading = false;
			return;
		}

		// Redirects to login when unauthenticated; only proceed with a session.
		const session = await requireSession(data.supabase, $page.url.pathname);
		if (!session) return;

		const supabase = getSupabaseClient(data.supabase);
		const { data: existing, error } = await fetchMyRegistration(supabase, session.user.id);

		if (error) {
			serverError = 'Gagal memuat data pendaftaran Anda. Muat ulang halaman untuk mencoba lagi.';
		} else if (existing) {
			fillFrom(existing);
			isReturning = true;
		}

		loading = false;
	});

	// Matches the migration's CHECK regex so client errors don't drift from DB constraints.
	const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
	const nisnRe = /^[0-9]{10}$/;
	// Indonesian-friendly phone — digits with optional leading +, spaces, dashes, parens; 8-16 digits.
	const phoneRe = /^\+?[\d\s\-()]{8,20}$/;

	const today = new Date().toISOString().slice(0, 10);

	function validate(v: Values): Errors {
		const e: Errors = {};

		if (!v.full_name.trim()) e.full_name = 'Nama lengkap wajib diisi.';
		if (!v.nisn.trim()) e.nisn = 'NISN wajib diisi.';
		else if (!nisnRe.test(v.nisn.trim())) e.nisn = 'NISN harus terdiri dari 10 digit angka.';
		if (!v.birth_place.trim()) e.birth_place = 'Tempat lahir wajib diisi.';
		if (!v.birth_date) e.birth_date = 'Tanggal lahir wajib diisi.';
		else if (v.birth_date > today) e.birth_date = 'Tanggal lahir tidak boleh di masa depan.';
		if (!v.gender) e.gender = 'Jenis kelamin wajib dipilih.';
		if (!v.address.trim()) e.address = 'Alamat wajib diisi.';
		if (!v.phone.trim()) e.phone = 'Nomor telepon wajib diisi.';
		else if (!phoneRe.test(v.phone.trim())) e.phone = 'Format nomor telepon tidak valid.';
		if (!v.email.trim()) e.email = 'Email wajib diisi.';
		else if (!emailRe.test(v.email.trim())) e.email = 'Format email tidak valid.';
		if (!v.prior_school.trim()) e.prior_school = 'Asal sekolah wajib diisi.';
		if (!v.target_program.trim()) e.target_program = 'Program pilihan wajib dipilih.';

		if (!v.father_name.trim()) e.father_name = 'Nama ayah wajib diisi.';
		if (!v.father_occupation.trim()) e.father_occupation = 'Pekerjaan ayah wajib diisi.';
		if (!v.father_phone.trim()) e.father_phone = 'Nomor telepon ayah wajib diisi.';
		else if (!phoneRe.test(v.father_phone.trim()))
			e.father_phone = 'Format nomor telepon tidak valid.';
		if (v.father_email.trim() && !emailRe.test(v.father_email.trim()))
			e.father_email = 'Format email tidak valid.';
		if (!v.father_address.trim()) e.father_address = 'Alamat ayah wajib diisi.';

		if (!v.mother_name.trim()) e.mother_name = 'Nama ibu wajib diisi.';
		if (!v.mother_occupation.trim()) e.mother_occupation = 'Pekerjaan ibu wajib diisi.';
		if (!v.mother_phone.trim()) e.mother_phone = 'Nomor telepon ibu wajib diisi.';
		else if (!phoneRe.test(v.mother_phone.trim()))
			e.mother_phone = 'Format nomor telepon tidak valid.';
		if (v.mother_email.trim() && !emailRe.test(v.mother_email.trim()))
			e.mother_email = 'Format email tidak valid.';
		if (!v.mother_address.trim()) e.mother_address = 'Alamat ibu wajib diisi.';

		return e;
	}

	const errors = $derived(validate(values));
	const isValid = $derived(Object.keys(errors).length === 0);

	function shown(field: keyof Values): string | undefined {
		if (submitAttempted || touched[field]) return errors[field];
		return undefined;
	}

	function blur(field: keyof Values) {
		touched[field] = true;
	}

	function toInput(v: Values): RegistrationInput {
		// isValid has already guaranteed gender is non-empty before we get here.
		return {
			full_name: v.full_name.trim(),
			nisn: v.nisn.trim(),
			birth_place: v.birth_place.trim(),
			birth_date: v.birth_date,
			gender: v.gender as 'male' | 'female',
			address: v.address.trim(),
			phone: v.phone.trim(),
			email: v.email.trim(),
			prior_school: v.prior_school.trim(),
			target_program: v.target_program.trim(),
			father_name: v.father_name.trim(),
			father_occupation: v.father_occupation.trim(),
			father_phone: v.father_phone.trim(),
			father_email: v.father_email.trim() || null,
			father_address: v.father_address.trim(),
			mother_name: v.mother_name.trim(),
			mother_occupation: v.mother_occupation.trim(),
			mother_phone: v.mother_phone.trim(),
			mother_email: v.mother_email.trim() || null,
			mother_address: v.mother_address.trim()
		};
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitAttempted = true;
		submitted = false;
		serverError = '';

		if (!isValid) {
			// Focus the first invalid field for accessibility.
			const firstErrorKey = Object.keys(errors)[0];
			if (firstErrorKey) {
				const el = document.getElementById(`reg-${firstErrorKey}`);
				el?.focus({ preventScroll: false });
				el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
			return;
		}

		if (!data.supabase) {
			serverError = 'Konfigurasi Supabase belum tersedia. Hubungi admin sekolah.';
			return;
		}

		submitting = true;
		try {
			const supabase = getSupabaseClient(data.supabase);
			const session = await requireSession(data.supabase, $page.url.pathname);
			if (!session) return;

			const { data: saved, error } = await saveMyRegistration(
				supabase,
				session.user.id,
				toInput(values),
				isReturning
			);

			if (error) {
				serverError = describeRegistrationError(error);
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
			}

			if (saved) fillFrom(saved);
			isReturning = true;
			submitted = true;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (err) {
			serverError =
				err instanceof Error ? err.message : 'Gagal menyimpan data. Silakan coba lagi.';
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} finally {
			submitting = false;
		}
	}

	const fieldClass =
		'mt-2 block min-h-10 w-full rounded-sm border border-neutral-200 bg-white px-3 text-sm text-neutral-900 transition placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/30';
	const textareaClass =
		'mt-2 block w-full resize-y rounded-sm border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 transition placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/30';
	const labelClass = 'text-sm font-semibold text-neutral-800';
	const errClass = 'mt-1.5 text-xs text-red-600';
</script>

<svelte:head>
	<title>Pendaftaran Siswa Baru — SMA Harapan Bangsa</title>
	<meta
		name="description"
		content="Formulir pendaftaran siswa baru SMA Harapan Bangsa. Lengkapi data pribadi dan data orang tua untuk memulai proses penerimaan."
	/>
</svelte:head>

<section class="bg-neutral-50 py-10 lg:py-18">
	<Container size="md">
		<div class="flex flex-col gap-3">
			<span class="text-xs font-semibold tracking-[0.18em] text-primary-700 uppercase">
				PPDB 2026 / 2027
			</span>
			<h1 class="text-balance text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
				Formulir Pendaftaran Siswa Baru
			</h1>
			<p class="max-w-2xl text-pretty text-base leading-relaxed text-neutral-600">
				{#if isReturning}
					Anda sudah pernah mengirim pendaftaran. Perbarui data di bawah ini bila ada perubahan,
					lalu simpan kembali. Anda juga dapat melihat ringkasan di
					<a href="/register/status" class="font-semibold text-primary-700 underline-offset-4 hover:underline">halaman status</a>.
				{:else}
					Lengkapi data pribadi calon siswa dan data orang tua/wali. Pastikan informasi yang
					diberikan akurat — tim admisi akan menggunakan data ini untuk verifikasi dan komunikasi
					selanjutnya.
				{/if}
			</p>
		</div>

		{#if configMissing}
			<div
				role="alert"
				class="mt-8 rounded-md border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800"
			>
				Konfigurasi Supabase belum tersedia. Formulir tidak dapat dimuat — hubungi admin sekolah.
			</div>
		{:else if loading}
			<div class="mt-12 flex items-center gap-3 text-sm text-neutral-500">
				<div
					class="size-5 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-500"
				></div>
				Memuat formulir pendaftaran…
			</div>
		{:else}
			{#if submitted}
				<div
					role="status"
					class="mt-8 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900"
				>
					<p class="font-semibold">Pendaftaran berhasil disimpan.</p>
					<p class="mt-1 text-emerald-800">
						Terima kasih, {values.full_name}. Data Anda telah tersimpan dan dapat diperbarui kapan
						saja selama masa pendaftaran. Lihat
						<a href="/register/status" class="font-semibold underline underline-offset-4">ringkasan pendaftaran</a>.
					</p>
				</div>
			{/if}

			{#if serverError}
				<div
					role="alert"
					class="mt-8 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
				>
					{serverError}
				</div>
			{/if}

			<form class="mt-8 flex flex-col gap-10" novalidate onsubmit={handleSubmit}>
				{#if submitAttempted && !isValid}
					<div
						role="alert"
						class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
					>
						Beberapa kolom belum terisi atau tidak valid. Silakan periksa kembali data Anda.
					</div>
				{/if}

			<!-- Personal data -->
			<fieldset class="flex flex-col gap-5 rounded-lg bg-white p-6 shadow-card lg:p-8">
				<legend class="px-2 text-base font-semibold text-neutral-900">
					<span class="mr-2 text-xs font-semibold tracking-[0.18em] text-primary-700 uppercase"
						>01</span
					>
					Data Pribadi Calon Siswa
				</legend>

				<div class="grid gap-5 sm:grid-cols-2">
					<div class="sm:col-span-2">
						<label for="reg-full_name" class={labelClass}>Nama lengkap</label>
						<input
							id="reg-full_name"
							name="full_name"
							type="text"
							autocomplete="name"
							required
							bind:value={values.full_name}
							onblur={() => blur('full_name')}
							aria-invalid={shown('full_name') ? 'true' : undefined}
							aria-describedby={shown('full_name') ? 'err-full_name' : undefined}
							class={fieldClass}
							placeholder="Sesuai akta kelahiran"
						/>
						{#if shown('full_name')}
							<p id="err-full_name" class={errClass}>{shown('full_name')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-nisn" class={labelClass}>NISN</label>
						<input
							id="reg-nisn"
							name="nisn"
							type="text"
							inputmode="numeric"
							pattern={'[0-9]{10}'}
							maxlength="10"
							required
							bind:value={values.nisn}
							onblur={() => blur('nisn')}
							aria-invalid={shown('nisn') ? 'true' : undefined}
							aria-describedby={shown('nisn') ? 'err-nisn' : 'hint-nisn'}
							class={fieldClass}
							placeholder="10 digit angka"
						/>
						{#if shown('nisn')}
							<p id="err-nisn" class={errClass}>{shown('nisn')}</p>
						{:else}
							<p id="hint-nisn" class="mt-1.5 text-xs text-neutral-500">
								Nomor Induk Siswa Nasional dari sekolah asal.
							</p>
						{/if}
					</div>

					<div>
						<label for="reg-gender" class={labelClass}>Jenis kelamin</label>
						<select
							id="reg-gender"
							name="gender"
							required
							bind:value={values.gender}
							onblur={() => blur('gender')}
							aria-invalid={shown('gender') ? 'true' : undefined}
							aria-describedby={shown('gender') ? 'err-gender' : undefined}
							class={fieldClass}
						>
							<option value="" disabled>Pilih jenis kelamin…</option>
							<option value="male">Laki-laki</option>
							<option value="female">Perempuan</option>
						</select>
						{#if shown('gender')}
							<p id="err-gender" class={errClass}>{shown('gender')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-birth_place" class={labelClass}>Tempat lahir</label>
						<input
							id="reg-birth_place"
							name="birth_place"
							type="text"
							required
							bind:value={values.birth_place}
							onblur={() => blur('birth_place')}
							aria-invalid={shown('birth_place') ? 'true' : undefined}
							aria-describedby={shown('birth_place') ? 'err-birth_place' : undefined}
							class={fieldClass}
							placeholder="Misal: Jakarta"
						/>
						{#if shown('birth_place')}
							<p id="err-birth_place" class={errClass}>{shown('birth_place')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-birth_date" class={labelClass}>Tanggal lahir</label>
						<input
							id="reg-birth_date"
							name="birth_date"
							type="date"
							required
							max={today}
							bind:value={values.birth_date}
							onblur={() => blur('birth_date')}
							aria-invalid={shown('birth_date') ? 'true' : undefined}
							aria-describedby={shown('birth_date') ? 'err-birth_date' : undefined}
							class={fieldClass}
						/>
						{#if shown('birth_date')}
							<p id="err-birth_date" class={errClass}>{shown('birth_date')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-email" class={labelClass}>Email</label>
						<input
							id="reg-email"
							name="email"
							type="email"
							autocomplete="email"
							required
							bind:value={values.email}
							onblur={() => blur('email')}
							aria-invalid={shown('email') ? 'true' : undefined}
							aria-describedby={shown('email') ? 'err-email' : undefined}
							class={fieldClass}
							placeholder="nama@email.com"
						/>
						{#if shown('email')}
							<p id="err-email" class={errClass}>{shown('email')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-phone" class={labelClass}>Nomor telepon</label>
						<input
							id="reg-phone"
							name="phone"
							type="tel"
							autocomplete="tel"
							required
							bind:value={values.phone}
							onblur={() => blur('phone')}
							aria-invalid={shown('phone') ? 'true' : undefined}
							aria-describedby={shown('phone') ? 'err-phone' : undefined}
							class={fieldClass}
							placeholder="+62 812 3456 7890"
						/>
						{#if shown('phone')}
							<p id="err-phone" class={errClass}>{shown('phone')}</p>
						{/if}
					</div>

					<div class="sm:col-span-2">
						<label for="reg-address" class={labelClass}>Alamat domisili</label>
						<textarea
							id="reg-address"
							name="address"
							rows="3"
							autocomplete="street-address"
							required
							bind:value={values.address}
							onblur={() => blur('address')}
							aria-invalid={shown('address') ? 'true' : undefined}
							aria-describedby={shown('address') ? 'err-address' : undefined}
							class={textareaClass}
							placeholder="Jalan, RT/RW, kelurahan, kecamatan, kota, kode pos"
						></textarea>
						{#if shown('address')}
							<p id="err-address" class={errClass}>{shown('address')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-prior_school" class={labelClass}>Asal sekolah (SMP)</label>
						<input
							id="reg-prior_school"
							name="prior_school"
							type="text"
							required
							bind:value={values.prior_school}
							onblur={() => blur('prior_school')}
							aria-invalid={shown('prior_school') ? 'true' : undefined}
							aria-describedby={shown('prior_school') ? 'err-prior_school' : undefined}
							class={fieldClass}
							placeholder="Nama SMP/MTs"
						/>
						{#if shown('prior_school')}
							<p id="err-prior_school" class={errClass}>{shown('prior_school')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-target_program" class={labelClass}>Program pilihan</label>
						<select
							id="reg-target_program"
							name="target_program"
							required
							bind:value={values.target_program}
							onblur={() => blur('target_program')}
							aria-invalid={shown('target_program') ? 'true' : undefined}
							aria-describedby={shown('target_program') ? 'err-target_program' : undefined}
							class={fieldClass}
						>
							<option value="" disabled>Pilih program…</option>
							{#each programs as program (program.id)}
								<option value={program.name}>{program.name} — {program.tagline}</option>
							{/each}
						</select>
						{#if shown('target_program')}
							<p id="err-target_program" class={errClass}>{shown('target_program')}</p>
						{/if}
					</div>
				</div>
			</fieldset>

			<!-- Father -->
			<fieldset class="flex flex-col gap-5 rounded-lg bg-white p-6 shadow-card lg:p-8">
				<legend class="px-2 text-base font-semibold text-neutral-900">
					<span class="mr-2 text-xs font-semibold tracking-[0.18em] text-primary-700 uppercase"
						>02</span
					>
					Data Ayah / Wali Pria
				</legend>

				<div class="grid gap-5 sm:grid-cols-2">
					<div class="sm:col-span-2">
						<label for="reg-father_name" class={labelClass}>Nama lengkap ayah</label>
						<input
							id="reg-father_name"
							name="father_name"
							type="text"
							required
							bind:value={values.father_name}
							onblur={() => blur('father_name')}
							aria-invalid={shown('father_name') ? 'true' : undefined}
							aria-describedby={shown('father_name') ? 'err-father_name' : undefined}
							class={fieldClass}
						/>
						{#if shown('father_name')}
							<p id="err-father_name" class={errClass}>{shown('father_name')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-father_occupation" class={labelClass}>Pekerjaan</label>
						<input
							id="reg-father_occupation"
							name="father_occupation"
							type="text"
							required
							bind:value={values.father_occupation}
							onblur={() => blur('father_occupation')}
							aria-invalid={shown('father_occupation') ? 'true' : undefined}
							aria-describedby={shown('father_occupation') ? 'err-father_occupation' : undefined}
							class={fieldClass}
						/>
						{#if shown('father_occupation')}
							<p id="err-father_occupation" class={errClass}>{shown('father_occupation')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-father_phone" class={labelClass}>Nomor telepon</label>
						<input
							id="reg-father_phone"
							name="father_phone"
							type="tel"
							required
							bind:value={values.father_phone}
							onblur={() => blur('father_phone')}
							aria-invalid={shown('father_phone') ? 'true' : undefined}
							aria-describedby={shown('father_phone') ? 'err-father_phone' : undefined}
							class={fieldClass}
							placeholder="+62 812 3456 7890"
						/>
						{#if shown('father_phone')}
							<p id="err-father_phone" class={errClass}>{shown('father_phone')}</p>
						{/if}
					</div>

					<div class="sm:col-span-2">
						<label for="reg-father_email" class={labelClass}>
							Email <span class="font-normal text-neutral-500">(opsional)</span>
						</label>
						<input
							id="reg-father_email"
							name="father_email"
							type="email"
							bind:value={values.father_email}
							onblur={() => blur('father_email')}
							aria-invalid={shown('father_email') ? 'true' : undefined}
							aria-describedby={shown('father_email') ? 'err-father_email' : undefined}
							class={fieldClass}
							placeholder="ayah@email.com"
						/>
						{#if shown('father_email')}
							<p id="err-father_email" class={errClass}>{shown('father_email')}</p>
						{/if}
					</div>

					<div class="sm:col-span-2">
						<label for="reg-father_address" class={labelClass}>Alamat</label>
						<textarea
							id="reg-father_address"
							name="father_address"
							rows="3"
							required
							bind:value={values.father_address}
							onblur={() => blur('father_address')}
							aria-invalid={shown('father_address') ? 'true' : undefined}
							aria-describedby={shown('father_address') ? 'err-father_address' : undefined}
							class={textareaClass}
							placeholder="Alamat lengkap ayah"
						></textarea>
						{#if shown('father_address')}
							<p id="err-father_address" class={errClass}>{shown('father_address')}</p>
						{/if}
					</div>
				</div>
			</fieldset>

			<!-- Mother -->
			<fieldset class="flex flex-col gap-5 rounded-lg bg-white p-6 shadow-card lg:p-8">
				<legend class="px-2 text-base font-semibold text-neutral-900">
					<span class="mr-2 text-xs font-semibold tracking-[0.18em] text-primary-700 uppercase"
						>03</span
					>
					Data Ibu / Wali Wanita
				</legend>

				<div class="grid gap-5 sm:grid-cols-2">
					<div class="sm:col-span-2">
						<label for="reg-mother_name" class={labelClass}>Nama lengkap ibu</label>
						<input
							id="reg-mother_name"
							name="mother_name"
							type="text"
							required
							bind:value={values.mother_name}
							onblur={() => blur('mother_name')}
							aria-invalid={shown('mother_name') ? 'true' : undefined}
							aria-describedby={shown('mother_name') ? 'err-mother_name' : undefined}
							class={fieldClass}
						/>
						{#if shown('mother_name')}
							<p id="err-mother_name" class={errClass}>{shown('mother_name')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-mother_occupation" class={labelClass}>Pekerjaan</label>
						<input
							id="reg-mother_occupation"
							name="mother_occupation"
							type="text"
							required
							bind:value={values.mother_occupation}
							onblur={() => blur('mother_occupation')}
							aria-invalid={shown('mother_occupation') ? 'true' : undefined}
							aria-describedby={shown('mother_occupation') ? 'err-mother_occupation' : undefined}
							class={fieldClass}
						/>
						{#if shown('mother_occupation')}
							<p id="err-mother_occupation" class={errClass}>{shown('mother_occupation')}</p>
						{/if}
					</div>

					<div>
						<label for="reg-mother_phone" class={labelClass}>Nomor telepon</label>
						<input
							id="reg-mother_phone"
							name="mother_phone"
							type="tel"
							required
							bind:value={values.mother_phone}
							onblur={() => blur('mother_phone')}
							aria-invalid={shown('mother_phone') ? 'true' : undefined}
							aria-describedby={shown('mother_phone') ? 'err-mother_phone' : undefined}
							class={fieldClass}
							placeholder="+62 812 3456 7890"
						/>
						{#if shown('mother_phone')}
							<p id="err-mother_phone" class={errClass}>{shown('mother_phone')}</p>
						{/if}
					</div>

					<div class="sm:col-span-2">
						<label for="reg-mother_email" class={labelClass}>
							Email <span class="font-normal text-neutral-500">(opsional)</span>
						</label>
						<input
							id="reg-mother_email"
							name="mother_email"
							type="email"
							bind:value={values.mother_email}
							onblur={() => blur('mother_email')}
							aria-invalid={shown('mother_email') ? 'true' : undefined}
							aria-describedby={shown('mother_email') ? 'err-mother_email' : undefined}
							class={fieldClass}
							placeholder="ibu@email.com"
						/>
						{#if shown('mother_email')}
							<p id="err-mother_email" class={errClass}>{shown('mother_email')}</p>
						{/if}
					</div>

					<div class="sm:col-span-2">
						<label for="reg-mother_address" class={labelClass}>Alamat</label>
						<textarea
							id="reg-mother_address"
							name="mother_address"
							rows="3"
							required
							bind:value={values.mother_address}
							onblur={() => blur('mother_address')}
							aria-invalid={shown('mother_address') ? 'true' : undefined}
							aria-describedby={shown('mother_address') ? 'err-mother_address' : undefined}
							class={textareaClass}
							placeholder="Alamat lengkap ibu"
						></textarea>
						{#if shown('mother_address')}
							<p id="err-mother_address" class={errClass}>{shown('mother_address')}</p>
						{/if}
					</div>
				</div>
			</fieldset>

				<div class="flex flex-wrap items-center gap-4">
					<Button type="submit" size="lg" disabled={submitting}>
						{#if submitting}
							Menyimpan…
						{:else if isReturning}
							Simpan Perubahan
						{:else}
							Kirim Pendaftaran
						{/if}
					</Button>
					<p class="text-xs text-neutral-500">
						Dengan mengirim, Anda menyatakan data yang diberikan benar dan menyetujui kebijakan
						privasi kami.
					</p>
				</div>
			</form>
		{/if}
	</Container>
</section>
