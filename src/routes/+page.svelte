<script lang="ts">
	import About from '$lib/components/About.svelte';
	import AchievementsSection from '$lib/components/AchievementsSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import FaqAccordion from '$lib/components/FaqAccordion.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProgramsSection from '$lib/components/ProgramsSection.svelte';
	import Section from '$lib/components/Section.svelte';
	import SectionHeading from '$lib/components/SectionHeading.svelte';
	import VirtualTour from '$lib/components/VirtualTour.svelte';
	import { ctaPrimary, site, virtualTour } from '$lib/config/site';
	import { faqs } from '$lib/data/faq';

	let { form } = $props();

	const phoneTel = site.contact.phone.replace(/\s+/g, '');
	const waNumber = site.contact.whatsapp.replace(/[^0-9]/g, '');
	const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
</script>

<svelte:head>
	<title>{site.name} — {site.tagline}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<Hero />
<About />
<ProgramsSection />
<AchievementsSection />

<Section id="galeri" tone="muted" spacing="md">
	<SectionHeading
		eyebrow="Galeri"
		title="Cuplikan kehidupan di {site.shortName}"
		description="Fasilitas, kegiatan belajar, ekstrakurikuler, dan momen-momen besar di sekolah — saring berdasarkan kategori untuk melihat lebih dekat."
	/>
	<div class="mt-10">
		<Gallery />
	</div>
</Section>

<Section id="tur-virtual" tone="default" spacing="md">
	<div class="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
		<div>
			<SectionHeading
				eyebrow="Tur Virtual"
				title="Jelajahi Sekolah Kami"
				description="Tidak sempat berkunjung langsung? Telusuri ruang kelas, laboratorium, perpustakaan, dan area olahraga kami dalam pengalaman 360° interaktif — dari mana saja, kapan saja."
			/>
			<ul class="mt-6 space-y-3 text-sm text-neutral-700">
				<li class="flex items-start gap-3">
					<span
						class="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-full bg-primary-100 text-primary-700"
						aria-hidden="true"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="size-3"
							><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg
						>
					</span>
					Lihat fasilitas dari berbagai sudut
				</li>
				<li class="flex items-start gap-3">
					<span
						class="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-full bg-primary-100 text-primary-700"
						aria-hidden="true"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="size-3"
							><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg
						>
					</span>
					Kompatibel dengan VR headset & mobile
				</li>
				<li class="flex items-start gap-3">
					<span
						class="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-full bg-primary-100 text-primary-700"
						aria-hidden="true"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="size-3"
							><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg
						>
					</span>
					Tanpa instalasi — langsung di browser
				</li>
			</ul>
			<div class="mt-8 flex flex-wrap gap-3">
				<Button href="#tur-virtual" size="lg">Mulai Tur Virtual</Button>
				<Button href="#kontak" variant="secondary" size="lg">Atur Kunjungan Langsung</Button>
			</div>
		</div>

		<VirtualTour embedUrl={virtualTour.embedUrl} title={virtualTour.title} />
	</div>
</Section>

<Section id="faq" tone="muted">
	<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
		<SectionHeading
			eyebrow="Pertanyaan Umum"
			title="Hal-hal yang sering ditanyakan calon orang tua"
			description="Belum menemukan jawaban yang Anda cari? Hubungi tim admisi kami melalui formulir di bawah."
		>
			<div class="mt-2 flex flex-wrap gap-3">
				<Button href="#kontak" variant="secondary" size="md">Kirim pertanyaan</Button>
				<Button
					href="https://wa.me/{waNumber}"
					variant="ghost"
					size="md"
					target="_blank"
					rel="noopener noreferrer"
				>
					Chat WhatsApp
				</Button>
			</div>
		</SectionHeading>

		<FaqAccordion items={faqs} />
	</div>
</Section>

<Section id="kontak" tone="default">
	<SectionHeading
		eyebrow="Kontak"
		title="Datang berkunjung atau hubungi kami"
		description="Tim admisi kami siap membantu Anda menemukan jalur belajar terbaik untuk putra-putri Anda."
		align="center"
		class="mx-auto"
	/>

	<div class="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-10">
		<div class="space-y-6 lg:col-span-2">
			<Card padding="lg" class="h-full">
				<h3 class="text-lg font-bold text-neutral-900">Informasi Sekolah</h3>

				<dl class="mt-6 space-y-5 text-sm">
					<div>
						<dt class="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500">Alamat</dt>
						<dd class="mt-1 not-italic text-neutral-700">
							{site.address.street}<br />
							{site.address.city}, {site.address.postal}<br />
							{site.address.country}
						</dd>
					</div>

					<div>
						<dt class="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500">Telepon</dt>
						<dd class="mt-1 text-neutral-700">
							<a href="tel:{phoneTel}" class="hover:text-primary-700">{site.contact.phone}</a>
							<span class="text-neutral-400"> · </span>
							<a
								href="https://wa.me/{waNumber}"
								target="_blank"
								rel="noopener noreferrer"
								class="hover:text-primary-700"
							>
								WhatsApp {site.contact.whatsapp}
							</a>
						</dd>
					</div>

					<div>
						<dt class="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500">Email</dt>
						<dd class="mt-1 text-neutral-700">
							<a href="mailto:{site.contact.email}" class="hover:text-primary-700">
								{site.contact.email}
							</a>
						</dd>
					</div>

					<div>
						<dt class="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500">
							Jam Operasional
						</dt>
						<dd class="mt-1 space-y-1 text-neutral-700">
							{#each site.hours as h (h.days)}
								<div class="flex justify-between gap-4">
									<span>{h.days}</span>
									<span class="font-medium text-neutral-900">{h.time}</span>
								</div>
							{/each}
						</dd>
					</div>
				</dl>

				<div class="mt-6 overflow-hidden rounded-xl border border-neutral-200">
					<iframe
						title="Peta lokasi {site.name}"
						src={mapsEmbed}
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						class="block aspect-[4/3] w-full"
					></iframe>
				</div>
			</Card>
		</div>

		<div class="lg:col-span-3">
			<Card padding="lg" class="h-full">
				<h3 class="text-lg font-bold text-neutral-900">Kirim Pesan</h3>
				<p class="mt-1 text-sm text-neutral-600">
					Kami biasanya membalas dalam 1×24 jam pada hari kerja.
				</p>

				{#if form?.success}
					<div
						role="status"
						class="mt-5 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-800"
					>
						Terima kasih, {form.values.nama}. Pesan Anda sudah kami terima — tim admisi akan segera
						menghubungi.
					</div>
				{/if}

				<form
					method="POST"
					action="?/contact"
					class="mt-6 grid gap-5"
					novalidate
				>
					<div class="grid gap-5 sm:grid-cols-2">
						<div>
							<label for="contact-nama" class="text-sm font-semibold text-neutral-800">
								Nama lengkap
							</label>
							<input
								id="contact-nama"
								name="nama"
								type="text"
								required
								autocomplete="name"
								value={form?.values?.nama ?? ''}
								aria-invalid={form?.errors?.nama ? 'true' : undefined}
								aria-describedby={form?.errors?.nama ? 'err-nama' : undefined}
								class="mt-2 block w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm transition placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
								placeholder="Nama Anda"
							/>
							{#if form?.errors?.nama}
								<p id="err-nama" class="mt-1.5 text-xs text-red-600">{form.errors.nama}</p>
							{/if}
						</div>

						<div>
							<label for="contact-email" class="text-sm font-semibold text-neutral-800">
								Email
							</label>
							<input
								id="contact-email"
								name="email"
								type="email"
								required
								autocomplete="email"
								value={form?.values?.email ?? ''}
								aria-invalid={form?.errors?.email ? 'true' : undefined}
								aria-describedby={form?.errors?.email ? 'err-email' : undefined}
								class="mt-2 block w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm transition placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
								placeholder="anda@email.com"
							/>
							{#if form?.errors?.email}
								<p id="err-email" class="mt-1.5 text-xs text-red-600">{form.errors.email}</p>
							{/if}
						</div>
					</div>

					<div>
						<label for="contact-pesan" class="text-sm font-semibold text-neutral-800">Pesan</label>
						<textarea
							id="contact-pesan"
							name="pesan"
							rows="5"
							required
							value={form?.values?.pesan ?? ''}
							aria-invalid={form?.errors?.pesan ? 'true' : undefined}
							aria-describedby={form?.errors?.pesan ? 'err-pesan' : undefined}
							class="mt-2 block w-full resize-y rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm transition placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
							placeholder="Tuliskan pertanyaan atau kebutuhan Anda…"
						></textarea>
						{#if form?.errors?.pesan}
							<p id="err-pesan" class="mt-1.5 text-xs text-red-600">{form.errors.pesan}</p>
						{/if}
					</div>

					<div class="flex flex-wrap items-center gap-3 pt-1">
						<Button type="submit" size="lg">Kirim Pesan</Button>
						<p class="text-xs text-neutral-500">
							Dengan mengirim, Anda menyetujui kebijakan privasi kami.
						</p>
					</div>
				</form>
			</Card>
		</div>
	</div>
</Section>

<Section id="pendaftaran" tone="muted" spacing="md">
	<div
		class="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-panel-950 px-6 py-14 text-white shadow-xl shadow-primary-900/20 sm:px-12 sm:py-16 lg:px-16 lg:py-20"
	>
		<div
			aria-hidden="true"
			class="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl"
		></div>
		<div
			aria-hidden="true"
			class="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-warm-400/30 blur-3xl"
		></div>

		<div class="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
			<div>
				<span
					class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-white"
				>
					<span class="size-1.5 rounded-full bg-white"></span>
					PPDB 2026 / 2027
				</span>
				<h2
					class="mt-5 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
				>
					Bergabunglah dengan Keluarga Besar {site.shortName}.
				</h2>
				<p class="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
					Kuota terbatas untuk gelombang pertama. Daftarkan putra-putri Anda dan mulai
					perjalanan belajar yang menumbuhkan karakter, prestasi, dan masa depan.
				</p>
			</div>

			<div class="flex flex-wrap gap-3 lg:justify-end">
				<Button href={ctaPrimary.href} size="lg" variant="secondary" class="!bg-white !text-primary-700 hover:!bg-neutral-100">
					{ctaPrimary.label}
				</Button>
				<Button
					href="https://wa.me/{waNumber}"
					size="lg"
					variant="ghost"
					target="_blank"
					rel="noopener noreferrer"
					class="!text-white hover:!bg-white/10"
				>
					Tanya Admisi
				</Button>
			</div>
		</div>
	</div>
</Section>
