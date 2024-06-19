import { addToCart } from "@/actions/cart"
import { Button } from "@/components/ui/button"
import { verifyAuthSession } from "@/lib/auth"

type Props = { id: any }
export default async function AddToCartBtn({ id }: Props) {
  const { user } = await verifyAuthSession()

  async function handleAddToCart() {
    "use server"
    addToCart(user?.id, id)
  }

  return (
    <form action={handleAddToCart}>
      <Button size="sm" type="submit" variant="primary">
        Add to Card
      </Button>
    </form>
  )
}
