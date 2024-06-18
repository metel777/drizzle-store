import { verifyAuthSession } from "@/lib/auth";
import { db } from "@/database/database";
import { customer_orders, products } from "@/database/schema";
import { and, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCart() {
    const { session } = await verifyAuthSession();
    const userId = Number(session?.userId);

    // check if cart exists
    const res = await db.select().from(customer_orders).where(eq(customer_orders.userId, userId));

    if (res.length > 0) {
        // get array with all productId and their quantities that are stored in user cart
        const productQuantities = res.map(order => ({
            productId: order.productId,
            quantity: order.quantity
        }));

        // select all productsId 
        const productIds = productQuantities.map(pq => pq.productId);
        const productsInfo = await db.select().from(products).where(inArray(products.id, productIds));

        // map productsInfo to include quantity
        const cartItems = productsInfo.map(product => {
            const quantityInfo = productQuantities.find(pq => pq.productId === product.id);
            return {
                ...product,
                quantity: quantityInfo?.quantity
            };
        });



        return cartItems;
    }

    // else return empty array
    return [];
}

export async function addToCart(userId: any, productId: any) {
    // check if cart exists on user 
    const res = await db.select().from(customer_orders).where(and(eq(customer_orders.userId, userId), eq(customer_orders.productId, productId)))

    if (res.length > 0) {
        // if product already exists - increase quantity
        await db.update(customer_orders)
            .set({ quantity: sql`${customer_orders.quantity} + 1`, })
            .where((and(
                eq(customer_orders.userId, userId),
                eq(customer_orders.productId, productId))))
    }

    //else just insert new item
    else {
        await db.insert(customer_orders).values({ userId, productId, quantity: 1 })
    }
    
    console.log('::::::::: Succed. added new item to cart ::::::::')
}

export async function deleteFromCart(productId: any, userId: any) {
    await db.delete(customer_orders).where(and(eq(customer_orders.userId, userId ), eq(customer_orders.productId, productId)))
}