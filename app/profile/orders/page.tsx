import { getAllOrders } from "@/actions/orders"
import { H1 } from "@/components/reusable/titles"
import { verifyAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import OrderIdHover from "@/components/reusable/order-id-hover"

export default async function ProfilePage() {
  const { user } = await verifyAuthSession()
  if (!user) {
    redirect("/auth?m=singin")
  }

  const orders = await getAllOrders(user.id)

  return (
    <main>
      <H1>Your orders</H1>
      <main className="flex gap-2 flex-wrap">
        {orders.length < 0
          ? "You dont have any orders."
          : orders.map((order) => (
              <div className="w-[300px]" key={order.order_id}>
                <OrderIdHover orderId={order.order_id} />
                <main className="p-4 bg-white flex flex-col gap-2">
                  {order.product.map((product) => (
                    <div className="flex" key={product.productInfo.id}>
                      <img
                        className="w-[100px] h-[100px]"
                        src={product.productInfo.imageUrl}
                        alt=""
                      />
                      <div>
                        <p className="text-text-strong font-semibold">
                          {product.productInfo.title}
                        </p>
                        <p>Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </main>
              </div>
            ))}
      </main>
    </main>
  )
}
