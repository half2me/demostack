import type {
	AnalyticsEngineDataset,
	D1Database,
	IncomingRequestCfProperties,
	KVNamespace,
	Queue,
} from '@cloudflare/workers-types'
import type { Env as WorkersEnv } from '../../functions/worker-configuration'

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
				ANALYTICS: AnalyticsEngineDataset
			} & WorkersEnv
			context: {
				waitUntil(promise: Promise<any>): void
			}
			caches: CacheStorage & { default: Cache }
			cf?: IncomingRequestCfProperties
		}
	}
}

export {}
