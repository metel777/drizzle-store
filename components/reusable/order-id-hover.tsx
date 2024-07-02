"use client"

import { SquareAsterisk } from "lucide-react"
import { useState } from "react"

type Props = {
  orderId: string
}
export default function OrderIdHover({ orderId }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div>
      <p className="cursor-pointer text-sm flex gap-1 items-center" onClick={() => setShow(true)}>
        {!show ? "Order ID" : orderId}
      </p>
    </div>
  )
}
