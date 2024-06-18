import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { deleteProduct } from "@/actions/products";

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const productId = formData.get('productId') as string

    await deleteProduct(productId)
    redirect('/admin/products')
}