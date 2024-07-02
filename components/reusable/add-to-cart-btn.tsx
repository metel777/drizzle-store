import { addToCart } from "@/actions/cart"
import { Button } from "@/components/ui/button"
import { verifyAuthSession } from "@/lib/auth"
import { toast } from "@/components/ui/use-toast"
import SubmitBtnWithToast from "./submit-btn-toast"

type Props = { id: any }
export default async function AddToCartBtn({ id }: Props) {
  const { user } = await verifyAuthSession()

  return (
    <form
      action={async () => {
        "use server"
        addToCart(user?.id, id)
      }}
    >
      <SubmitBtnWithToast toastVariant="success" toastDescription="Product has been succesfully added to your cart" toastTitle="Success">Add to cart</SubmitBtnWithToast>
    </form>
  )
}
