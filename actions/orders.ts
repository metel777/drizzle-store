'use server'

import { db } from "@/database/database";
import { ProductsSchemaType, customer_orders, order_items, products } from "@/database/schema";
import { PUBLIC_KEY, generateDataAndSignature } from "@/lib/generate-data-signature";
import { LiqPayData } from "@/types/liqpay-data";
import { eq, inArray } from "drizzle-orm";

export async function getPaymentStatus(orderId: string) {
    const reqData: LiqPayData = {
        action: "status",
        version: 3,
        public_key: PUBLIC_KEY,
        order_id: orderId,
    }

    const sign = generateDataAndSignature(reqData)

    try {
        const response = await fetch('https://www.liqpay.ua/api/request', {
            body: new URLSearchParams({
                data: sign.base64Data,
                signature: sign.base64Signature
            }),
            method: "POST"
        })

        if (!response.ok) {
            throw new Error('Failed to fetch payment status');
        }
        const data = await response.json()
        return data
    } catch (error) {

    }
}

type finalProducts = {
    order_id: string,
    product: [
        {
            quantity: string | number
            productInfo: ProductsSchemaType
        }
    ]
}

export async function getAllOrders(userId: any) {

    //find all customer_orders with the current user id
    const a = await db
        .select({ order_id: customer_orders.id })
        .from(customer_orders)
        .where(eq(customer_orders.userId, userId))

    const aa = a.map(item => {
        return item.order_id
    })

    //find all order_items with the previous expression
    if (aa.length > 0) {

        const orderItems = await db.select().from(order_items).where(inArray(order_items.order_id, aa))

        //:::::::Main:::::::: 
        const order: finalProducts[] = []

        // //get products
        const orderItemsProducts = await db.select({ product_id: order_items.products_id }).from(order_items)
        const productIds = orderItemsProducts.map(item => {
            return item.product_id
        })

        const allProducts = await db.select().from(products).where(inArray(products.id, productIds))

        orderItems.map(item => {

            const quantityAndProduct = {
                quantity: item.quantity as number,
                //get product with current item.product id
                productInfo: allProducts.filter(product => product.id === item.products_id)[0]
            }

            const orderItem = {
                // status: 
                order_id: item.order_id as string,
                product: [
                    quantityAndProduct
                ]
            }

            //check if order is already exists
            const findDub = order.findIndex(d => d.order_id === item.order_id)
            if (findDub === -1) {
                order.push(orderItem as any)
            } else {
                order[findDub].product.push(quantityAndProduct)
            }
        })
        return order
    }
    return []

}
