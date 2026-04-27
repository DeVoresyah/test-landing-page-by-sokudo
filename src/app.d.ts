// See https://svelte.dev/docs/kit/types#app
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env?: {
				// Bind Cloudflare resources here as they're added.
			};
			cf?: CfProperties;
			ctx?: ExecutionContext;
		}
	}
}

export {};
