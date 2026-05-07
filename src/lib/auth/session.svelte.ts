import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseClient } from '$lib/supabase/client';
import type { SupabaseBrowserConfig } from '$lib/supabase/types';

type SessionState = {
	session: Session | null;
	loading: boolean;
};

const state: SessionState = $state({ session: null, loading: true });
let initialized = false;
let unsubscribe: (() => void) | null = null;

export function getSessionState(): Readonly<SessionState> {
	return state;
}

export async function initAuth(config: SupabaseBrowserConfig): Promise<SupabaseClient> {
	const supabase = getSupabaseClient(config);

	if (initialized) return supabase;
	initialized = true;

	const { data } = await supabase.auth.getSession();
	state.session = data.session;
	state.loading = false;

	const sub = supabase.auth.onAuthStateChange((_event, session) => {
		state.session = session;
	});
	unsubscribe = () => sub.data.subscription.unsubscribe();

	return supabase;
}

export function teardownAuth(): void {
	unsubscribe?.();
	unsubscribe = null;
	initialized = false;
}

export async function signOut(config: SupabaseBrowserConfig, redirectTo = '/register/login'): Promise<void> {
	const supabase = getSupabaseClient(config);
	await supabase.auth.signOut();
	state.session = null;
	if (browser) await goto(redirectTo, { invalidateAll: true });
}

// Redirects to login if no session. Returns the session when present.
// Must be awaited so callers can branch on the result.
export async function requireSession(
	config: SupabaseBrowserConfig,
	currentPath: string
): Promise<Session | null> {
	const supabase = getSupabaseClient(config);
	const { data } = await supabase.auth.getSession();

	if (!data.session) {
		const next = encodeURIComponent(currentPath);
		if (browser) await goto(`/register/login?next=${next}`);
		return null;
	}

	state.session = data.session;
	return data.session;
}
