import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { updateProduct } from "@/actions/products";

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const title = formData.get('title') as string
    const imageUrl = formData.get('imageUrl') as string
    const price = formData.get('price') as any
    const description = formData.get('description') as string
    const productId = formData.get('productId')

    updateProduct({ id: productId, title, imageUrl, price, description })
    
    redirect('/')
}