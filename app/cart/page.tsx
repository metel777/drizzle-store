import { getCart } from "@/actions/cart"
import { getTotalPrice } from "@/actions/products"
import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"
import PaymentForm from "./payment-form"

export default async function CartPage() {
  const res = await getCart()
  const res2: any = await getTotalPrice()
  const totalPrice = Number(res2[0].total_price)

  return (
    <main>
      <H1>Cart</H1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {res.length > 0
          ? res.map((item) => (
              <main key={item.id} className="flex bg-fill ">
                <img
                  src={item.imageUrl}
                  className="h-[100px] w-[150px] object-contain pr-2 border-r"
                  alt={item.title}
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
        <PaymentForm totalPrice={totalPrice} />
        Cart: <code>4000000000003055</code>
      </section>
    </main>
  )
}
