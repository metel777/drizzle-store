import { getCart } from "@/actions/cart"
import { getTotalPrice } from "@/actions/products"
import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"

type Props = {}
export default async function CartPage({}: Props) {
  const res = await getCart()
  const res2 = await getTotalPrice() as any
  const totalPrice = Number(res2[0].total_price)

  return (
    <main>
      <H1>Cart</H1>
      <section className="grid grid-cols-2 gap-4">
        {res.length > 0
          ? res.map((item) => (
              <main key={item.id} className="flex bg-fill">
                <img
                  src={item.imageUrl}
                  className=" p-2 h-[100px] border-r"
                  alt=""
                />
                <div className="pl-5">
                  <div className="flex flex-col ">
                    <h3 className="text-xl text-text-strong">{item.title}</h3>
                    <p className="">Quantity: {item.quantity}</p>
                  </div>
                  <form action="/api/delete-cart" method="POST">
                    <Button size="sm" type="submit" variant="destructive">
                      Delete
                    </Button>
                    <input type="hidden" name="productId" value={item.id} />
                  </form>
                </div>
              </main>
            ))
          : "There is no items in the cart."}
      </section>
      <hr className="my-5 border-stroke-strong" />
      <section className="text-center">
        <H1>Total price: $ {totalPrice}</H1>
        <Button className="text-lg" size="lg">
          Order
        </Button>
      </section>
    </main>
  )
}
