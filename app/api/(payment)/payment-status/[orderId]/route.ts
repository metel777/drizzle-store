import { getPaymentStatus } from "@/actions/orders";
import { db } from "@/database/database";
import { customer_orders, user_cart } from "@/database/schema";
import { verifyAuthSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: {
    params: { orderId: string }
}) {
    const {user} = await verifyAuthSession()

    const paymentStatus = await getPaymentStatus(params.orderId)
    console.log(paymentStatus)

    if (paymentStatus.result === "ok") {
        await db.update(customer_orders).set({ status: 'paid' }).where(eq(customer_orders.userId, user?.id as any))
        await db.delete(user_cart).where(eq(user_cart.userId, user?.id as any))
    }

    redirect('/')

}