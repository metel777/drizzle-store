import { getCart } from "@/actions/cart"
import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"

type Props = {}
export default async function CartPage({}: Props) {
  const res = await getCart()
  return (
    <main>
      <H1>Cart</H1>
      <section className="grid grid-cols-2 gap-4">
        {res.length > 0 ? res.map((item) => (
          <main key={item.id} className="flex bg-white">
            <img
              src={item.imageUrl}
              className=" p-2 h-[100px] border-r"
              alt=""
            />
            <div className="p-2">
              <div className="flex flex-col ">
                <h3 className="text-xl text-neutral-900">{item.title}</h3>
                <p className="">Quantity: {item.quantity}</p>
              </div>
              <form action="/api/delete-cart" method="POST">
                <Button type="submit" variant="destructive">
                  Delete
                </Button>
                <input type="hidden" name="productId" value={item.id} />
              </form>
            </div>
          </main>
        )) : 'There is no items in the cart.'}
        {/* <span>Total price: $</span> */}
      </section>
    </main>
  )
}
