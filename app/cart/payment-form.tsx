import { Button } from "@/components/ui/button"
import {
  PRIVATE_KEY,
  PUBLIC_KEY,
  generateDataAndSignature,
} from "@/lib/generate-data-signature"
import { LiqPayData } from "@/types/liqpay-data"

type Props = { totalPrice: number }

export default function PaymentForm({ totalPrice }: Props) {
  const data:LiqPayData = {
    version: 3,
    public_key: PUBLIC_KEY,
    private_key: PRIVATE_KEY,
    action: "pay",
    amount: totalPrice,
    currency: "UAH",
    description: "Order payment",
    order_id: Math.random().toString(),
    card: "4000000000003055",
    card_exp_month: "12",
    card_exp_year: "25",
    result_url: "http://localhost:3000/cart",
    server_url: "http://localhost:3000/api/pay",
    sandbox: 1,
  }
  const sign = generateDataAndSignature(data)
  const { base64Data, base64Signature } = sign

  return (
    // <form action="/api/pay" method="POST">
    <form target="_blank" action="https://www.liqpay.ua/api/3/checkout" method="POST">
      {/* <form action="https://www.liqpay.ua/api/request" method="POST"> */}
      <Button className="text-lg" size="lg">
        Order
      </Button>
      <input type="hidden" name="data" value={base64Data} />
      <input type="hidden" name="signature" value={base64Signature} />
    </form>
  )
}
