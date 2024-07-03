'use server'

import { verifyAuthSession } from "@/lib/auth";
import { db } from "@/database/database";
import { user_cart, products } from "@/database/schema";
import { and, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath, unstable_cache } from "next/cache";

export const getCart = async () => {
    const { session } = await verifyAuthSession();
    const userId = session?.userId;

    // check if cart exists
    const res = await db.select().from(user_cart).where(eq(user_cart.userId, userId as any));

    if (res.length > 0) {
        // get array with all productId and their quantities that are stored in user cart
        const productQuantities = res.map(cart => ({
            productId: cart.productId,
            quantity: cart.quantity
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

export async function addToCart(userId: string, productId: number) {
    revalidatePath('/cart')
    
    // check if cart exists on user 
    const res = await db
        .select()
        .from(user_cart)
        .where(and(
            eq(user_cart.userId, userId),
            eq(user_cart.productId, productId)
        ))

    if (res.length > 0) {
        // if product already exists - increase quantity
        await db.update(user_cart)
            .set({ quantity: sql`${user_cart.quantity} + 1`, })
            .where((and(
                eq(user_cart.userId, userId),
                eq(user_cart.productId, productId))))
    }

    //else just insert new item
    else {
        await db.insert(user_cart).values({ productId: productId, userId: userId, quantity: 1 })
    }
   
}

export async function deleteFromCart(productId: any, userId: any) {
    await db
        .delete(user_cart)
        .where(and(
            eq(user_cart.userId, userId),
            eq(user_cart.productId, productId)
        ))
}