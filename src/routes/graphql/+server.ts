import { useGraphQlJit } from '@envelop/graphql-jit'
import { type RequestHandler } from '@sveltejs/kit'
import { createSchema, createYoga } from 'graphql-yoga'
import schema from '../../schema.graphql?raw'

const yogaApp = createYoga({
	batching: true,
	logging: true,
	schema: createSchema({
		typeDefs: [schema],
		resolvers: {
			Query: {
				names: () => ['Alice', 'Bob', 'Charlie'],
			},
			Mutation: {
				addName: (_, { name }) => {
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
				names
			}
		`,
	},
	fetchAPI: { Response },
}) satisfies RequestHandler

export { yogaApp as GET, yogaApp as OPTIONS, yogaApp as POST }
