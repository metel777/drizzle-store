import { fetchAll } from "@/actions/products"
import ProductCard from "@/components/reusable/main-page-product-card"


export default async function EditAllProductsPage() {

const data = await fetchAll()

  return (
    <main>
      <h1 className="text-2xl font-bold text-neutral-950 ">Shop</h1>
      <section className="mt-5 grid grid-cols-5 gap-3">
        {data.length > 0 ? (
          data.map((item) => (
            <ProductCard
              description={item.description}
              editing={true}
              id={item.id}
              imageUrl={item.imageUrl}
              price={item.price}
              title={item.title}
              key={item.id}
            />
          ))
        ) : (
          <p>There is no items..</p>
        )}
      </section>
    </main>
  )
}
