import { fetchAll } from "@/actions/products"
import FilterSection from "@/components/filter-section"
import ProductCard from "@/components/reusable/main-page-product-card"
import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"

export default async function HomeShop() {
  const data = await fetchAll()

  return (
    <main>
      <H1>Shop</H1>

    {/* <FilterSection/> */}

      <section className="mt-5 grid grid-cols-5 gap-3">
        {data?.length > 0 ? (
          data.map((item) => (
            <ProductCard
              description={item.description}
              editing={false}
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
