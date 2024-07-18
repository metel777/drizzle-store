import { addToCart } from "@/actions/cart";
import { verifyAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest, response: NextResponse) {
    const formData = await request.formData()
    revalidatePath('/cart')
    const productId = Number(formData.get('productId'))
    const { user } = await verifyAuthSession()
    try {
        if (user) {
            await addToCart(user.id, productId)
            revalidatePath('/cart')
            redirect('/')
        }
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            redirect('/')
        }
    }
   
}