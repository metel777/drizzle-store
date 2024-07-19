import { pgTable, serial, varchar, integer, timestamp, text, decimal } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
    id: varchar("id", { length: 255 }).primaryKey().unique(),
    email: varchar('email', { length: 256 }).unique().notNull(),
    passwordHash: varchar('password_hash', { length: 256 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const products = pgTable('products', {
    id: serial("id").primaryKey(),
    title: varchar('title', { length: 256 }).notNull(),
    imageUrl: varchar('image_url', { length: 256 }).notNull(),
    price: integer('price').notNull(),
    description: text('description').notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export type ProductsSchemaType = typeof products.$inferSelect

export const user_cart = pgTable('user_cart', {
    id: serial('id').primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
    productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
    quantity: integer('quantity'),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})

// //:::::: Customer orders ::::::

export const customer_orders = pgTable('customer_orders', {
    id: varchar('id', { length: 255 }).primaryKey().unique(),
    userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id).unique(),
    status: varchar('status', { length: 50, enum: ['pending', 'paid', 'cancelled'] }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const order_items = pgTable('order_items', {
    order_id: varchar('order_id', { length: 255 }).references(() => customer_orders.id),
    products_id: integer('product_id').references(() => products.id, { onDelete: 'cascade' }),
    quantity: integer('quantity'),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    // orderUserId: varchar('order_user_id', { length: 255 }).notNull().references(() => customer_orders.userId),
    orderUserId: varchar('user_id', { length: 255 }).notNull().references(() => users.id),
})

export const sessions = pgTable('sessions', {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
})

// //:::::: Customer cart ::::::

// export const customer_carts = mysqlTable('customer_carts', {
//     id: int('id').primaryKey().autoincrement(),
//     userId: int('userId').notNull().references(() => users.id),
//     createdAt: timestamp("createdAt").notNull().defaultNow(),
// })

// export const cart_items = mysqlTable('cart_items', {
//     cart_id: int('cart_id').references(() => customer_carts.id),
//     products_id: int('productId').unique().notNull().references(() => products.id, { onDelete: 'cascade' }),
//     quantity: int('quantity'),
//     createdAt: timestamp("createdAt").notNull().defaultNow(),
// })

// //:::::: Customer orders ::::::

// export const customer_orders = mysqlTable('customer_orders', {
//     id: int('id').primaryKey().autoincrement(),
//     userId: int('userId').notNull().references(() => users.id),
//     status: varchar('status', {length: 50}),
//     createdAt: timestamp("createdAt").notNull().defaultNow(),
// })

// export const order_items = mysqlTable('order_items', {
//     order_id: int('order_id').references(() => customer_orders.id),
//     products_id: int('productId').unique().notNull().references(() => products.id, { onDelete: 'cascade' }),
//     quantity: int('quantity'),
//     createdAt: timestamp("createdAt").notNull().defaultNow(),
// })



// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(255) NOT NULL UNIQUE,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE user_phones (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     phone_number VARCHAR(20) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );

// CREATE TABLE user_payment_methods (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     card_number VARCHAR(20) NOT NULL,
//     cardholder_name VARCHAR(255) NOT NULL,
//     expiration_date DATE NOT NULL,
//     cvv VARCHAR(4) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );


// CREATE TABLE user_addresses (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     street VARCHAR(255) NOT NULL,
//     city VARCHAR(255) NOT NULL,
//     state VARCHAR(255),
//     zip_code VARCHAR(20) NOT NULL,
//     country VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );


// CREATE TABLE products (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     description TEXT,
//     price DECIMAL(10, 2) NOT NULL,
//     stock INT NOT NULL,
//     category_id INT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (category_id) REFERENCES categories(id)
// );

// CREATE TABLE categories (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL UNIQUE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE user_cart (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     product_id INT NOT NULL,
//     quantity INT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id),
//     FOREIGN KEY (product_id) REFERENCES products(id)
// );

// CREATE TABLE user_orders (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     total_price DECIMAL(10, 2) NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );

// CREATE TABLE order_products (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     order_id INT NOT NULL,
//     product_id INT NOT NULL,
//     quantity INT NOT NULL,
//     price DECIMAL(10, 2) NOT NULL,
//     FOREIGN KEY (order_id) REFERENCES user_orders(id),
//     FOREIGN KEY (product_id) REFERENCES products(id)
// );

// CREATE TABLE user_favourites (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     product_id INT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id),
//     FOREIGN KEY (product_id) REFERENCES products(id)
// );
