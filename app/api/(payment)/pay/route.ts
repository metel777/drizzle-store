import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const data = formData.get('data')
    const signature = formData.get('signature')

    redirect(`https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`)
}

