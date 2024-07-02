import { getAllOrders } from "@/actions/orders"
import { H1 } from "@/components/reusable/titles"
import { verifyAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import OrderIdHover from "@/components/reusable/order-id-hover"
import { db } from "@/database/database"
import { customer_orders, order_items, products } from "@/database/schema"
import { eq } from "drizzle-orm"

export default async function ProfilePage() {
  const { user } = await verifyAuthSession()
  if (!user) {
    redirect("/auth?m=singin")
  }

  const orders = await getAllOrders(user.id)

  // const ordersSql = await db
  //   .select({
  //     order_id: customer_orders.id,
  //     quantity: order_items.quantity,
  //     products: products,
  //   })
  //   .from(customer_orders)
  //   .innerJoin(order_items, eq(order_items.order_id, customer_orders.id))
  //   .innerJoin(products, eq(products.id, order_items.products_id))
  //   .where(eq(customer_orders.userId, user.id as any))

    

  // console.log("::::::::::SQL ORDERS::::::::::", ordersSql)

  return (
    <main>
      <H1>Your orders</H1>
      <main className="flex gap-2 flex-wrap">
        {!orders.length
          ? "You dont have any orders."
          : orders.map((order) => (
              <div className="w-[300px]" key={order.order_id}>
                <OrderIdHover orderId={order.order_id} />
                <main className="p-4 bg-white flex flex-col gap-2">
                  {order.product.map((product) => (
                    <div className="flex">
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
        {/* {ordersSql.map((item) => (
          <div>
            <p className="text-text-strong">{item.products.title}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))} */}
      </main>
    </main>
  )
}
