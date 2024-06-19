import { insertDefaultValues } from "@/actions/products";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
    await insertDefaultValues()
    redirect('/')
}