import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './lib/schema.ts',
    dialect: 'mysql',
    out: './database/migrations',
    dbCredentials: {
        host: "localhost",
        user: "root",
        port: 3306,
        database: "node-complete",
        password: "1ORACLEJJS!",
    },
    verbose: true,
    strict: true
})