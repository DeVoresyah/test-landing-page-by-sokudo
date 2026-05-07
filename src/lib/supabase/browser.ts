import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { SupabaseBrowserConfig } from './types';

export function createSupabaseBrowserClient(config: SupabaseBrowserConfig): SupabaseClient {
	const url = config.url.trim();
	const anonKey = config.anonKey.trim();

	if (!url || !anonKey) {
		throw new Error('Supabase browser client requires url and anonKey.');
	}

	return createClient(url, anonKey);
}
