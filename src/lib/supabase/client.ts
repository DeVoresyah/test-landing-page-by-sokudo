import { browser } from '$app/environment';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { SupabaseBrowserConfig } from './types';

let client: SupabaseClient | null = null;

// Singleton — multiple createClient() calls would fight over the same
// localStorage session and break auto-refresh.
export function getSupabaseClient(config: SupabaseBrowserConfig): SupabaseClient {
	if (!browser) {
		throw new Error('getSupabaseClient must be called in the browser.');
	}

	if (!client) {
		client = createClient(config.url.trim(), config.anonKey.trim(), {
			auth: {
				persistSession: true,
				autoRefreshToken: true,
				detectSessionInUrl: false,
				flowType: 'pkce'
			}
		});
	}

	return client;
}

export function resetSupabaseClient(): void {
	client = null;
}
