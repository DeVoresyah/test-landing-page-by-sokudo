<script lang="ts">
	import { site, nav } from '$lib/config/site';
	import Container from './Container.svelte';
	import Logo from './Logo.svelte';

	const year = new Date().getFullYear();
	const phoneTel = site.contact.phone.replace(/\s+/g, '');
	const waNumber = site.contact.whatsapp.replace(/[^0-9]/g, '');
</script>

<footer class="border-t border-neutral-200 bg-white text-neutral-700">
	<Container>
		<div class="grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
			<div>
				<Logo tone="flat" />
				<address class="mt-5 space-y-1 text-sm not-italic leading-relaxed text-neutral-600">
					<p>
						{site.address.street}<br />
						{site.address.city}, {site.address.postal}<br />
						{site.address.country}
					</p>
				</address>
				<dl class="mt-4 space-y-1 text-sm">
					<div class="flex gap-2">
						<dt class="text-neutral-500">Telepon</dt>
						<dd>
							<a href="tel:{phoneTel}" class="text-neutral-700 hover:text-primary-600">
								{site.contact.phone}
							</a>
						</dd>
					</div>
					<div class="flex gap-2">
						<dt class="text-neutral-500">WhatsApp</dt>
						<dd>
							<a
								href="https://wa.me/{waNumber}"
								target="_blank"
								rel="noopener noreferrer"
								class="text-neutral-700 hover:text-primary-600"
							>
								{site.contact.whatsapp}
							</a>
						</dd>
					</div>
					<div class="flex gap-2">
						<dt class="text-neutral-500">Email</dt>
						<dd>
							<a href="mailto:{site.contact.email}" class="text-neutral-700 hover:text-primary-600">
								{site.contact.email}
							</a>
						</dd>
					</div>
				</dl>
				<p class="mt-4 inline-flex items-center gap-2 text-xs text-neutral-500">
					<span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
					PPDB 2026 / 2027 dibuka
				</p>
			</div>

			<div>
				<h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-900">Navigasi</h3>
				<ul class="mt-4 space-y-2 text-sm">
					{#each nav as item (item.href)}
						<li>
							<a href={item.href} class="text-neutral-600 transition-colors hover:text-primary-600">
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-900">Ikuti Kami</h3>
				<ul class="mt-4 space-y-2 text-sm">
					{#each site.social as link (link.href)}
						<li>
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								class="text-neutral-600 transition-colors hover:text-primary-600"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div
			class="flex flex-col gap-2 border-t border-neutral-200 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {year} {site.name}. Hak cipta dilindungi undang-undang.</p>
			<p>Dibuat dengan dedikasi untuk pendidikan Indonesia.</p>
		</div>
	</Container>
</footer>
