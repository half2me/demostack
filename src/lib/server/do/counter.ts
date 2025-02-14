import { DurableObject } from 'cloudflare:workers'

/** A Durable Object's behavior is defined in an exported Javascript class */
export class MyCounter extends DurableObject<Env> {
	/**
	 * The constructor is invoked once upon creation of the Durable Object, i.e. the first call to
	 * 	`DurableObjectStub::get` for a given identifier (no-op constructors can be omitted)
	 *
	 * @param ctx - The interface for interacting with Durable Object state
	 * @param env - The interface to reference bindings declared in wrangler.jsonc
	 */
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env)
	}

	async getCounterValue() {
		const value: number = (await this.ctx.storage.get('value')) || 0
		return value
	}

	async increment(amount: number = 1) {
		let value: number = (await this.ctx.storage.get('value')) || 0
		value += amount
		// You do not have to worry about a concurrent request having modified the value in storage.
		// "input gates" will automatically protect against unwanted concurrency.
		// Read-modify-write is safe.
		await this.ctx.storage.put('value', value)
		return value
	}
}
