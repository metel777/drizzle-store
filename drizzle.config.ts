'use server'

import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: './database/schema.ts',
  dialect: 'postgresql',
  out: './database/migrations',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
  // verbose: true,
  // strict: true
})