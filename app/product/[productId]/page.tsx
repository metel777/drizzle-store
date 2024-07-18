import { getProductById } from "@/actions/products"
import AddToCartBtn from "@/components/reusable/add-to-cart-btn"
import { H1, H2 } from "@/components/reusable/titles"

type params = {
  params: {
    productId: string
  }
}

export default async function ProductsPage({ params }: params) {
  const id = params.productId
  const res = await getProductById(id)
  const data = res[0]

  return (
    <main className="h-screen">
      <header className="bg-white ">
        {data && (
          <section className="grid grid-cols-2 gap-4">
            <img src={data.imageUrl} alt="" />
            <div className="p-4">
              <H1>{data.title}</H1>
              <p>{data.description}</p>
              <div className="flex gap-5 mt-3">
                <H2>$ {data.price}</H2>
                <AddToCartBtn productId={data.id} />
              </div>
            </div>
          </section>
        )}
      </header>
    </main>
  )
}
