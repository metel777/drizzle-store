import { Button } from "@/components/ui/button"
import { db } from "@/database/database"
import { customer_orders, order_items, user_cart } from "@/database/schema"
import {
  PRIVATE_KEY,
  PUBLIC_KEY,
  generateDataAndSignature,
} from "@/lib/generate-data-signature"
import { LiqPayData } from "@/types/liqpay-data"
import { redirect } from "next/navigation"
import crypto from "crypto"
import { verifyAuthSession } from "@/lib/auth"
import { eq } from "drizzle-orm"

type Props = { totalPrice: number }
export default async function PaymentForm({ totalPrice }: Props) {
  const generatedOrderId: string = crypto.randomBytes(16).toString("hex")
  const { user } = (await verifyAuthSession()) as any //number

  const data: LiqPayData = {
    version: 3,
    public_key: PUBLIC_KEY,
    private_key: PRIVATE_KEY,
    action: "pay",
    amount: totalPrice,
    currency: "UAH",
    description: "Order payment",
    order_id: generatedOrderId,
    result_url: `http://localhost:3000/api/payment-status/${generatedOrderId}`,
    server_url: "http://localhost:3000/api/pay",
    sandbox: 1,
  }
  const sign = generateDataAndSignature(data)
  const { base64Data, base64Signature } = sign

  return (
    <>
      <form
        action={async () => {
          "use server"
          //add to order with status pending
          await db.insert(customer_orders).values({
            id: generatedOrderId as any,
            userId: user.id,
            status: "pending",
          })

          //add order items
          const cartTemp = await db
            .select()
            .from(user_cart)
            .where(eq(user_cart.userId, user.id))

          cartTemp.map(async (cart) => {
            await db.insert(order_items).values({
              products_id: cart.productId,
              order_id: generatedOrderId,
              quantity: cart.quantity,
              orderUserId: user.id,
            })
          })

          redirect(
            `https://www.liqpay.ua/api/3/checkout?data=${base64Data}&signature=${base64Signature}`
          )
        }}
      >
        <Button className="text-lg" size="lg">
          Order
        </Button>
        <input type="hidden" name="data" value={base64Data} />
        <input type="hidden" name="signature" value={base64Signature} />
      </form>
    </>
  )
}
