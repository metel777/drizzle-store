import { addToCart } from "@/actions/cart"
import { verifyAuthSession } from "@/lib/auth"
import { toast } from "@/components/ui/use-toast"
import SubmitBtnWithToast from "./submit-btn-toast"

type Props = { productId: number }
export default async function AddToCartBtn({ productId }: Props) {
  const { user } = await verifyAuthSession() as any

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
