<script lang="ts">
	import { site, nav } from '$lib/config/site';
	import Container from './Container.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="bg-neutral-900 text-neutral-300">
	<Container>
		<div class="grid gap-12 py-16 lg:grid-cols-4 lg:gap-8 lg:py-20">
			<div class="lg:col-span-2">
				<a href="/" class="inline-flex items-center gap-2 font-bold text-white">
					<span
						class="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-md shadow-primary-500/30"
					>
						{site.logoMark}
					</span>
					<span class="text-lg tracking-tight">{site.name}</span>
				</a>
				<p class="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">
					{site.description}
				</p>
				<ul class="mt-6 flex flex-wrap gap-3">
					{#each site.social as link (link.href)}
						<li>
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-neutral-200 transition hover:border-primary-400 hover:bg-primary-500/10 hover:text-white"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="text-sm font-semibold uppercase tracking-wider text-white">Navigasi</h3>
				<ul class="mt-4 space-y-2 text-sm">
					{#each nav as item (item.href)}
						<li>
							<a href={item.href} class="text-neutral-400 transition hover:text-white">
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="text-sm font-semibold uppercase tracking-wider text-white">Kontak</h3>
				<address class="mt-4 space-y-3 text-sm not-italic text-neutral-400">
					<p>
						{site.address.street}<br />
						{site.address.city}<br />
						{site.address.postal}<br />
						{site.address.country}
					</p>
					<p class="space-y-1">
						<span class="block">
							<span class="text-neutral-500">Telepon:</span>
							<a href="tel:{site.contact.phone.replace(/\s+/g, '')}" class="hover:text-white">
								{site.contact.phone}
							</a>
						</span>
						<span class="block">
							<span class="text-neutral-500">WhatsApp:</span>
							<a
								href="https://wa.me/{site.contact.whatsapp.replace(/[^0-9]/g, '')}"
								class="hover:text-white"
							>
								{site.contact.whatsapp}
							</a>
						</span>
						<span class="block">
							<span class="text-neutral-500">Email:</span>
							<a href="mailto:{site.contact.email}" class="hover:text-white">
								{site.contact.email}
							</a>
						</span>
					</p>
				</address>
			</div>
		</div>

		<div
			class="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {year} {site.name}. Hak cipta dilindungi undang-undang.</p>
			<p>Dibuat dengan dedikasi untuk pendidikan Indonesia.</p>
		</div>
	</Container>
</footer>
