import { getSupabaseBrowserConfig } from '$lib/server/supabase';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (event) => {
	return {
		supabase: getSupabaseBrowserConfig(event)
	};
};
