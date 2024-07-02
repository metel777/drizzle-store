import { defineConfig } from 'drizzle-kit'

export const mysql_password = process.env.NEXT_PUBLIC_MYSQL_PASSWORD as string

export default defineConfig({
    schema: './database/schema.ts',
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