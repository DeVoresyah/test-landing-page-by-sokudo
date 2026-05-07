<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import { getSupabaseClient } from '$lib/supabase/client';

	let { data } = $props();

	let email = $state('');
	let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
	let errorMessage = $state('');

	const next = $derived($page.url.searchParams.get('next') ?? '/register');
	const callbackUrl = $derived.by(() => {
		if (typeof window === 'undefined') return '';
		const url = new URL('/register/auth/callback', window.location.origin);
		url.searchParams.set('next', next);
		return url.toString();
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const trimmed = email.trim().toLowerCase();
		if (!trimmed) {
			status = 'error';
			errorMessage = 'Masukkan alamat email Anda.';
			return;
		}

		if (!data.supabase) {
			status = 'error';
			errorMessage = 'Konfigurasi Supabase belum tersedia. Hubungi admin sekolah.';
			return;
		}

		status = 'sending';
		errorMessage = '';

		try {
			const supabase = getSupabaseClient(data.supabase);
			const { error } = await supabase.auth.signInWithOtp({
				email: trimmed,
				options: {
					emailRedirectTo: callbackUrl,
					shouldCreateUser: true
				}
			});

			if (error) {
				status = 'error';
				errorMessage = error.message;
				return;
			}

			status = 'sent';
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Gagal mengirim tautan masuk.';
		}
	}
</script>

<svelte:head>
	<title>Masuk Pendaftaran · SMA Cita Bangsa</title>
</svelte:head>

<section class="bg-surface min-h-[calc(100vh-5rem)] py-16 sm:py-24">
	<Container size="sm">
		<div class="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-12">
			<div class="mb-8 space-y-3">
				<p class="text-primary-600 text-sm font-semibold tracking-wide uppercase">Pendaftaran Siswa Baru</p>
				<h1 class="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Masuk dengan email</h1>
				<p class="text-base text-neutral-600">
					Kami akan mengirim tautan masuk satu kali ke email Anda. Klik tautan tersebut untuk melanjutkan
					pendaftaran — tidak perlu kata sandi.
				</p>
			</div>

			{#if status === 'sent'}
				<div
					role="status"
					class="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900"
				>
					<h2 class="text-lg font-semibold">Periksa kotak masuk Anda</h2>
					<p class="mt-2 text-sm">
						Kami telah mengirim tautan masuk ke <strong>{email}</strong>. Tautan berlaku selama 1 jam.
					</p>
					<button
						type="button"
						class="mt-4 text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline"
						onclick={() => {
							status = 'idle';
							errorMessage = '';
						}}
					>
						Gunakan email lain
					</button>
				</div>
			{:else}
				<form class="space-y-5" onsubmit={handleSubmit} novalidate>
					<label class="block">
						<span class="text-sm font-medium text-neutral-800">Email</span>
						<input
							type="email"
							name="email"
							autocomplete="email"
							required
							bind:value={email}
							disabled={status === 'sending'}
							placeholder="nama@email.com"
							class="focus:border-primary-500 focus:ring-primary-500/20 mt-2 block w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm transition focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
						/>
					</label>

					{#if status === 'error'}
						<p role="alert" class="text-sm text-red-600">{errorMessage}</p>
					{/if}

					<Button type="submit" fullWidth size="lg" disabled={status === 'sending'}>
						{status === 'sending' ? 'Mengirim tautan…' : 'Kirim tautan masuk'}
					</Button>

					<p class="text-xs text-neutral-500">
						Dengan melanjutkan, Anda menyetujui kebijakan privasi pendaftaran. Pastikan email yang
						digunakan dapat diakses oleh wali calon siswa.
					</p>
				</form>
			{/if}
		</div>
	</Container>
</section>
