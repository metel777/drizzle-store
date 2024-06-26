import crypto from "crypto"

export const PUBLIC_KEY = process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY!
export const PRIVATE_KEY = process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY!

export function generateDataAndSignature(data: object){
    const base64Data = Buffer.from(JSON.stringify(data)).toString("base64")
    const signString = PRIVATE_KEY + base64Data + PRIVATE_KEY
    const sha1 = crypto.createHash("sha1").update(signString).digest()
    const base64Signature = Buffer.from(sha1).toString("base64")

    return {base64Data, base64Signature}
}

