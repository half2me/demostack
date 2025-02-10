import { type Config, defineConfig } from 'drizzle-kit'

// Some hacky configuration needed to be able to use the local D1 instance that miniflare provides

const localConfig: Partial<Config> = {
	dbCredentials: {
		url: process.env.LOCAL_DB_PATH!,
	},
}

const remoteConfig: Partial<Config> = {
	driver: 'd1-http',
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
		token: process.env.CLOUDFLARE_D1_TOKEN!,
	},
}

export default defineConfig({
	schema: './src/lib/server/db/schema',
	verbose: true,
	strict: true,
	dialect: 'sqlite',
	out: './migrations',
	...(process.env.LOCAL_DB_PATH ? localConfig : remoteConfig),
})
