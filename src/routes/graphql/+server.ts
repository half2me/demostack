import { useGraphQlJit } from '@envelop/graphql-jit'
import type { RequestEvent, RequestHandler } from '@sveltejs/kit'
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
			},
			Mutation: {
				KVAddName: async (_, { name }, ctx) => {
					await ctx.platform!.env!.KV.put(name, name)
					return name
				},
			},
		},
	}),
	plugins: [useGraphQlJit()],
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
