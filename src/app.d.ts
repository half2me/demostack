import { D1Database, KVNamespace } from '@cloudflare/workers-types'

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env?: {
				KV: KVNamespace
				DB: D1Database
			}
			context: {
				waitUntil(promise: Promise<any>): void
			}
			caches: CacheStorage & { default: Cache }
		}
	}
}

export {}
