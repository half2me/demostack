import { names } from '$lib/server/db/schema/names'
import type { RequestEvent, RequestHandler } from '@sveltejs/kit'
import { drizzle } from 'drizzle-orm/d1'
import { createSchema, createYoga } from 'graphql-yoga'
import schema from '../../schema.graphql?raw'

const yogaApp = createYoga<RequestEvent>({
	batching: true,
	logging: true,
	schema: createSchema({
		typeDefs: [schema],
		resolvers: {
			Query: {
				KVNames: async (_, _args, ctx) => {
					const res = await ctx.platform!.env!.KV.list({ limit: 10 })
					return res.keys?.map((key) => key.name)
				},
				D1Names: async (_, _args, ctx) => {
					const db = drizzle(ctx.platform!.env!.DB)
					return await db.select().from(names).all()
				},
				DOCounter: async (_, _args, ctx) => {
					const id = ctx.platform!.env!.DO_COUNTER.idFromName('foo')
					const stub = ctx.platform!.env!.DO_COUNTER.get(id)
					return await stub.getCounterValue()
				},
			},
			Mutation: {
				KVAddName: async (_, { name }, ctx) => {
					await ctx.platform!.env!.KV.put(name, name)
					return name
				},
				D1AddName: async (_, { name }, ctx) => {
					const db = drizzle(ctx.platform!.env!.DB)
					const res = await db.insert(names).values({ name }).returning()
					return res[0]
				},
				DOIncrementCounter: async (_, { amount }, ctx) => {
					const id = ctx.platform!.env!.DO_COUNTER.idFromName('foo')
					const stub = ctx.platform!.env!.DO_COUNTER.get(id)
					return await stub.increment(amount || 1)
				},
				QueueAddTask: async (_, { task }, ctx) => {
					await ctx.platform!.env!.QUEUE?.send(task, { contentType: 'text' })
					return !!ctx.platform!.env!.QUEUE
				},
				AnalyticsWriteDataPoint: (_, { value }, ctx) => {
					const { region, country, city } = ctx.platform!.cf!
					const blobs = [region, country, city].filter((i) => i) as [string]
					ctx.platform!.env!.ANALYTICS?.writeDataPoint({
						blobs: [...blobs, 'foobar'],
						doubles: [value],
						indexes: ['foo'],
					})
					return !!ctx.platform!.env!.ANALYTICS
				},
			},
		},
	}),
	plugins: [],
	graphqlEndpoint: '/graphql',
	graphiql: {
		defaultQuery: /* GraphQL */ `
			query {
				KVNames
			}
		`,
	},
	fetchAPI: { Response },
}) satisfies RequestHandler

export { yogaApp as GET, yogaApp as OPTIONS, yogaApp as POST }
