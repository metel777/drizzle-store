import { deleteFromCart } from "@/actions/cart";
import { verifyAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const productId = formData.get('productId')

    const { user } = await verifyAuthSession()

    await deleteFromCart(productId, user?.id)
    redirect('/cart')
}