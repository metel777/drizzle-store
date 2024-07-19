import { addToCart } from "@/actions/cart"
import { verifyAuthSession } from "@/lib/auth"
import SubmitBtnWithToast from "./submit-btn-toast"
import { Button } from "../ui/button"
import Link from "next/link"

type Props = { productId: number }
export default async function AddToCartBtn({ productId }: Props) {
  const { user } = (await verifyAuthSession()) as any

  if (!user) {
    return (
      <Link href="/auth/signup">
        <Button>Add to cart</Button>
      </Link>
    )
  }

  return (
    <form
      action={async () => {
        "use server"
        addToCart(user.id, productId)
      }}
    >
      <SubmitBtnWithToast
        toastVariant="success"
        toastDescription="Product has been succesfully added to your cart"
        toastTitle="Success"
      >
        Add to cart
      </SubmitBtnWithToast>
    </form>
  )
}
