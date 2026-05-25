import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';

// Fields the applicant fills in. Mirrors the insert/update grants in
// migration 20260507000000_create_registrations.sql — keep in sync.
export type RegistrationInput = {
	full_name: string;
	nisn: string;
	birth_place: string;
	birth_date: string;
	gender: 'male' | 'female';
	address: string;
	phone: string;
	email: string;
	prior_school: string;
	target_program: string;

	father_name: string;
	father_occupation: string;
	father_phone: string;
	father_email: string | null;
	father_address: string;

	mother_name: string;
	mother_occupation: string;
	mother_phone: string;
	mother_email: string | null;
	mother_address: string;
};

// Full row as returned by the DB (input + server-managed columns).
export type Registration = RegistrationInput & {
	id: string;
	user_id: string;
	created_at: string;
	updated_at: string;
};

const TABLE = 'registrations';

// Maps Postgres/PostgREST errors to applicant-facing Indonesian messages.
// Constraint names/codes come from the migration; anything unmatched falls
// back to a generic message so we never leak raw DB text to the user.
export function describeRegistrationError(error: PostgrestError): string {
	// Unique violation — nisn is the only user-facing unique column besides user_id.
	if (error.code === '23505') {
		if (error.message.includes('nisn')) {
			return 'NISN ini sudah terdaftar atas nama pendaftar lain.';
		}
		return 'Data ini sudah terdaftar.';
	}
	// Check constraint violation.
	if (error.code === '23514') {
		return 'Beberapa data tidak memenuhi format yang diizinkan. Periksa kembali isian Anda.';
	}
	// RLS / permission.
	if (error.code === '42501') {
		return 'Sesi Anda tidak memiliki izin untuk menyimpan data ini. Silakan masuk kembali.';
	}
	return 'Gagal menyimpan data. Silakan coba lagi beberapa saat lagi.';
}

// Fetches the signed-in applicant's registration, or null if they haven't
// submitted yet. RLS restricts the result to the caller's own row.
export async function fetchMyRegistration(
	client: SupabaseClient,
	userId: string
): Promise<{ data: Registration | null; error: PostgrestError | null }> {
	const { data, error } = await client
		.from(TABLE)
		.select('*')
		.eq('user_id', userId)
		.maybeSingle();

	return { data: (data as Registration | null) ?? null, error };
}

// Inserts or updates the applicant's row. We deliberately avoid PostgREST
// upsert: an upsert's ON CONFLICT DO UPDATE puts every payload column —
// including user_id — into the SET list, and the migration's UPDATE grant
// does NOT include user_id (only the INSERT grant does), so the update path
// would fail with 42501. Branching on `isExisting` keeps each write within
// its granted column set: INSERT carries user_id, UPDATE never touches it.
export async function saveMyRegistration(
	client: SupabaseClient,
	userId: string,
	input: RegistrationInput,
	isExisting: boolean
): Promise<{ data: Registration | null; error: PostgrestError | null }> {
	const query = isExisting
		? client.from(TABLE).update(input).eq('user_id', userId)
		: client.from(TABLE).insert({ ...input, user_id: userId });

	const { data, error } = await query.select('*').maybeSingle();

	return { data: (data as Registration | null) ?? null, error };
}
