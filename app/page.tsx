import PageNavigation from "@/components/PageNavigation"
import FilterSection from "@/components/filter-section"
import ProductCard from "@/components/reusable/main-page-product-card"
import { H1 } from "@/components/reusable/titles"
import { db } from "@/database/database"
import { products } from "@/database/schema"
import { desc } from "drizzle-orm"

export default async function HomeShop({
  searchParams,
}: {
  searchParams: { page: string; order: string }
}) {
  const page = Number(searchParams.page)

  function orderBy() {
    if (searchParams.order === "price") {
      return products.price
    } else if (searchParams.order === "name") {
      return products.title
    } else if (searchParams.order === "newest") {
      return products.createdAt
    }
  }

  const data = await db
    .select()
    .from(products)
    .orderBy(desc(orderBy() as any))
    .limit(5)
    .offset(5 * (page - 1))

  return (
    <main className="relative">
      <H1>Shop</H1>

      <FilterSection />
      <section className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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

      <PageNavigation />
    </main>
  )
}
