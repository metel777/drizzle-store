"use client"

import { toast } from "sonner"
import { Button } from "../ui/button"
import { db } from "@/lib/database";
import { customer_orders } from "@/database/schema";
// import { addToCart } from "@/actions/cart"

type Props = { id: number; userId: any }
export default function AddToCartBtn({ id, userId }: Props) {
  async function handleClick() {
    toast("Item has been added to the cart.", {
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
    await db.insert(customer_orders).values({ userId, productId: id })
  }
  return (
    <main>
      <Button variant="outline" onClick={handleClick}>
        Add to cart
      </Button>
    </main>
  )
}
