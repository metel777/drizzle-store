import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const PUBLIC_KEY = process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY!;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY!;

export async function POST(req: NextRequest) {
 

}

export default POST;
