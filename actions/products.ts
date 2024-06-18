import { db } from "@/database/database";
import { products } from "@/database/schema";
import { eq } from "drizzle-orm";

type Product = {
    title: string
    imageUrl: string
    price: number
    description: string
    id?: any
}

export function fetchAll() {
    return db.select().from(products)
}
export function getProductById(id: any) {
    return db.select().from(products).where(eq(products.id, id))
}

export async function addProduct({ title, imageUrl, price, description }: Product) {
    await db.insert(products).values({ title, imageUrl, price, description, createdAt: new Date, updatedAt: new Date })
}

export async function updateProduct({ id, title, imageUrl, price, description }: Product) {
    await db.update(products).set({ title, imageUrl, price, description, updatedAt: new Date }).where(eq(products.id, id))
}

export async function deleteProduct(id: any) {
    await db.delete(products).where(eq(products.id, id))
}