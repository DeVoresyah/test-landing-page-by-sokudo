import { fail, type Actions } from '@sveltejs/kit';

type ContactPayload = {
	nama: string;
	email: string;
	pesan: string;
};

type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
	contact: async ({ request }) => {
		const data = await request.formData();
		const nama = String(data.get('nama') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const pesan = String(data.get('pesan') ?? '').trim();

		const errors: FieldErrors = {};
		if (nama.length < 2) errors.nama = 'Nama minimal 2 karakter.';
		if (!EMAIL_RE.test(email)) errors.email = 'Format email tidak valid.';
		if (pesan.length < 10) errors.pesan = 'Pesan minimal 10 karakter.';

		if (Object.keys(errors).length > 0) {
			return fail(400, { values: { nama, email, pesan }, errors });
		}

		// No email backend wired up yet — log for now so the form roundtrips end-to-end.
		console.log('[contact] new submission', { nama, email, pesan });

		return { success: true, values: { nama, email, pesan } };
	}
};
