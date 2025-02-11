import { D1Database, KVNamespace, type Queue } from '@cloudflare/workers-types'
import { Env as WorkersEnv } from '../../functions/worker-configuration'

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
				QUEUE: Queue
			} & WorkersEnv
			context: {
				waitUntil(promise: Promise<any>): void
			}
			caches: CacheStorage & { default: Cache }
		}
	}
}

export {}
