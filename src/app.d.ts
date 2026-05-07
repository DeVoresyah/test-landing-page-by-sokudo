// See https://svelte.dev/docs/kit/types#app
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env?: {
				SUPABASE_URL?: string;
				SUPABASE_ANON_KEY?: string;
				SUPABASE_SERVICE_ROLE_KEY?: string;
				[key: string]: unknown;
			};
			cf?: CfProperties;
			ctx?: ExecutionContext;
		}
	}
}

export {};
