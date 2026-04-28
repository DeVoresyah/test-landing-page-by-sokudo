<script lang="ts">
	import { onMount } from 'svelte';
	import { nav, ctaPrimary } from '$lib/config/site';
	import Button from './Button.svelte';
	import Logo from './Logo.svelte';

	let open = $state(false);
	let activeId = $state('beranda');

	onMount(() => {
		const ids = nav.map((n) => n.href.replace(/^#/, ''));
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		if (sections.length === 0) return;

		const visibility = new Map<string, number>();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					visibility.set(entry.target.id, entry.intersectionRatio);
				}
				let bestId = activeId;
				let bestRatio = 0;
				for (const [id, ratio] of visibility) {
					if (ratio > bestRatio) {
						bestRatio = ratio;
						bestId = id;
					}
				}
				if (bestRatio > 0) activeId = bestId;
			},
			{ rootMargin: '-72px 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
		);

		for (const section of sections) observer.observe(section);
		return () => observer.disconnect();
	});

	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	function close() {
		open = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<header class="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white">
	<div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
		<Logo tone="flat" />

		<nav aria-label="Navigasi utama" class="hidden items-center gap-8 lg:flex">
			{#each nav as item (item.href)}
				{@const id = item.href.replace(/^#/, '')}
				{@const isActive = id === activeId}
				<a
					href={item.href}
					aria-current={isActive ? 'page' : undefined}
					class="text-sm font-medium transition-colors {isActive
						? 'text-primary-600'
						: 'text-neutral-500 hover:text-neutral-900'}"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="hidden lg:block">
			<Button href={ctaPrimary.href} size="sm">{ctaPrimary.label}</Button>
		</div>

		<button
			type="button"
			class="grid size-10 place-items-center rounded-lg text-neutral-700 transition hover:bg-neutral-100 lg:hidden"
			aria-label={open ? 'Tutup menu' : 'Buka menu'}
			aria-expanded={open}
			aria-controls="mobile-drawer"
			onclick={() => (open = !open)}
		>
			{#if open}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-6"
					aria-hidden="true"
				>
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-6"
					aria-hidden="true"
				>
					<path d="M4 7h16M4 12h16M4 17h16" />
				</svg>
			{/if}
		</button>
	</div>
</header>

{#if open}
	<button
		type="button"
		aria-label="Tutup menu"
		class="fixed inset-0 z-30 bg-neutral-900/40 lg:hidden"
		onclick={close}
	></button>
	<aside
		id="mobile-drawer"
		class="fixed inset-y-0 right-0 z-40 flex w-[80%] max-w-xs flex-col border-l border-neutral-200 bg-white lg:hidden"
	>
		<div class="flex h-20 items-center justify-between border-b border-neutral-200 px-6">
			<Logo tone="flat" size="sm" />
			<button
				type="button"
				class="grid size-10 place-items-center rounded-lg text-neutral-700 transition hover:bg-neutral-100"
				aria-label="Tutup menu"
				onclick={close}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-5"
					aria-hidden="true"
				>
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</button>
		</div>
		<nav aria-label="Navigasi mobile" class="flex flex-1 flex-col gap-1 px-4 py-6">
			{#each nav as item (item.href)}
				{@const id = item.href.replace(/^#/, '')}
				{@const isActive = id === activeId}
				<a
					href={item.href}
					onclick={close}
					aria-current={isActive ? 'page' : undefined}
					class="rounded-lg px-3 py-3 text-base font-medium transition-colors {isActive
						? 'text-primary-600'
						: 'text-neutral-600 hover:text-neutral-900'}"
				>
					{item.label}
				</a>
			{/each}
		</nav>
		<div class="border-t border-neutral-200 p-4">
			<Button href={ctaPrimary.href} fullWidth onclick={close}>{ctaPrimary.label}</Button>
		</div>
	</aside>
{/if}
