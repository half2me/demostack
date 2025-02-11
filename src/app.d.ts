import { D1Database, DurableObjectNamespace, KVNamespace } from '@cloudflare/workers-types'

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
				DO_COUNTER: DurableObjectNamespace<import('../demostackfunctions/src/index').MyCounter>
			}
			context: {
				waitUntil(promise: Promise<any>): void
			}
			caches: CacheStorage & { default: Cache }
		}
	}
}

export {}
