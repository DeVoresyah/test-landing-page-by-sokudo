<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Container from '$lib/components/Container.svelte';
	import { getSupabaseClient } from '$lib/supabase/client';

	let { data } = $props();

	let status = $state<'verifying' | 'error'>('verifying');
	let errorMessage = $state('');

	function buildLoginRedirect(reason: string): string {
		const params = new URLSearchParams({ error: reason });
		return `/register/login?${params.toString()}`;
	}

	onMount(async () => {
		if (!data.supabase) {
			status = 'error';
			errorMessage = 'Konfigurasi Supabase belum tersedia.';
			return;
		}

		const url = new URL(window.location.href);
		const code = url.searchParams.get('code');
		const errorDescription = url.searchParams.get('error_description') ?? url.searchParams.get('error');
		const next = url.searchParams.get('next') ?? '/register';

		if (errorDescription) {
			status = 'error';
			errorMessage = errorDescription;
			return;
		}

		if (!code) {
			status = 'error';
			errorMessage = 'Tautan tidak valid atau sudah kedaluwarsa.';
			return;
		}

		try {
			const supabase = getSupabaseClient(data.supabase);
			const { error } = await supabase.auth.exchangeCodeForSession(code);

			if (error) {
				status = 'error';
				errorMessage = error.message;
				return;
			}

			// Strip auth params from history so a refresh doesn't re-run the exchange.
			await goto(next, { replaceState: true, invalidateAll: true });
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Verifikasi gagal.';
		}
	});
</script>

<svelte:head>
	<title>Memverifikasi · SMA Cita Bangsa</title>
</svelte:head>

<section class="bg-surface flex min-h-[calc(100vh-5rem)] items-center py-16">
	<Container size="sm">
		<div class="rounded-3xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
			{#if status === 'verifying'}
				<div class="mx-auto mb-6 size-12 animate-spin rounded-full border-4 border-neutral-200 border-t-primary-500"></div>
				<h1 class="text-2xl font-semibold tracking-tight text-neutral-900">Memverifikasi tautan…</h1>
				<p class="mt-2 text-sm text-neutral-600">Mohon tunggu, kami sedang menyiapkan sesi Anda.</p>
			{:else}
				<h1 class="text-2xl font-semibold tracking-tight text-neutral-900">Verifikasi gagal</h1>
				<p class="mt-2 text-sm text-neutral-600">{errorMessage}</p>
				<a
					href={buildLoginRedirect(errorMessage)}
					class="mt-6 inline-flex text-primary-600 text-sm font-semibold underline-offset-4 hover:underline"
				>
					Coba kirim tautan lagi
				</a>
			{/if}
		</div>
	</Container>
</section>
