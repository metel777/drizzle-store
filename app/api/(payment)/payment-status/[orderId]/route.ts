import { getPaymentStatus } from "@/actions/orders";
import { db } from "@/database/database";
import { customer_orders, user_cart } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: {
    params: { orderId: string }
}) {
    const paymentStatus = await getPaymentStatus(params.orderId)
    console.log(paymentStatus)

    if (paymentStatus.result === "ok") {
        await db.update(customer_orders).set({ status: 'paid' }).where(eq(customer_orders.userId, 1))
        await db.delete(user_cart).where(eq(user_cart.userId, 1))
    }
    
    redirect('/')

}