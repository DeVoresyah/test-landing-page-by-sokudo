import { env } from '$env/dynamic/private';
import type { RequestEvent } from '@sveltejs/kit';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { SupabaseBrowserConfig } from '$lib/supabase/types';

type SupabaseEnvKey = 'SUPABASE_URL' | 'SUPABASE_ANON_KEY' | 'SUPABASE_SERVICE_ROLE_KEY';
type RuntimeEvent = Pick<RequestEvent, 'platform'>;

const serverClientOptions = {
	auth: {
		autoRefreshToken: false,
		detectSessionInUrl: false,
		persistSession: false
	}
};

function readEnv(event: RuntimeEvent | undefined, key: SupabaseEnvKey): string | undefined {
	const platformValue = event?.platform?.env?.[key];
	const value = typeof platformValue === 'string' ? platformValue : env[key];
	const trimmed = value?.trim();

	return trimmed ? trimmed : undefined;
}

function requireEnv(event: RuntimeEvent | undefined, keys: SupabaseEnvKey[]): Record<SupabaseEnvKey, string> {
	const values = Object.fromEntries(keys.map((key) => [key, readEnv(event, key)])) as Record<
		SupabaseEnvKey,
		string | undefined
	>;
	const missing = keys.filter((key) => !values[key]);

	if (missing.length > 0) {
		throw new Error(`Missing Supabase environment variables: ${missing.join(', ')}`);
	}

	return values as Record<SupabaseEnvKey, string>;
}

export function getSupabaseBrowserConfig(event?: RuntimeEvent): SupabaseBrowserConfig | null {
	const url = readEnv(event, 'SUPABASE_URL');
	const anonKey = readEnv(event, 'SUPABASE_ANON_KEY');

	if (!url || !anonKey) return null;

	return { url, anonKey };
}

export function createSupabaseServerClient(event?: RuntimeEvent): SupabaseClient {
	const values = requireEnv(event, ['SUPABASE_URL', 'SUPABASE_ANON_KEY']);

	return createClient(values.SUPABASE_URL, values.SUPABASE_ANON_KEY, serverClientOptions);
}

export function createSupabaseServiceRoleClient(event?: RuntimeEvent): SupabaseClient {
	const values = requireEnv(event, ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']);

	return createClient(values.SUPABASE_URL, values.SUPABASE_SERVICE_ROLE_KEY, serverClientOptions);
}
