import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/database/database';
import { customer_orders } from '@/database/schema';
import { redirect } from 'next/navigation';

const PUBLIC_KEY = process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY!;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY!;

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const data = formData.get('data')
    const signature = formData.get('signature')

    redirect(`https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`)
}

