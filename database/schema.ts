import { mysqlTable, serial, varchar, int, timestamp, datetime, text } from "drizzle-orm/mysql-core";

export const products = mysqlTable('products', {
    id: int('id').primaryKey().unique().autoincrement(),
    title: varchar('title', { length: 256 }).notNull(),
    imageUrl: varchar('imageUrl', { length: 256 }).notNull(),
    price: int('price').notNull(),
    description: text('description').notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    email: varchar('email', { length: 256 }).unique().notNull(),
    password: varchar('password', { length: 256 }).notNull(),
})

export const customer_orders = mysqlTable('customer_orders', {
    id: int('id').primaryKey().autoincrement(),
    userId: int('userId').notNull().references(() => users.id),
    productId: int('productId').unique().notNull().references(() => products.id, {onDelete: 'cascade'}),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    quantity: int('quantity')
})

export const sessions = mysqlTable('sessions', {
    id: varchar('id', { length: 256 }).primaryKey().notNull(),
    expiresAt: datetime('expiresAt').notNull(),
    userId: int("userId").notNull().references(() => users.id),
})