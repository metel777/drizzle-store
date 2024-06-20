import { fetchAll } from "@/actions/products"
import PageNavigation from "@/components/PageNavigation"
import FilterSection from "@/components/filter-section"
import ProductCard from "@/components/reusable/main-page-product-card"
import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"
import { db } from "@/database/database"
import { products } from "@/database/schema"
import { desc } from "drizzle-orm"
import Link from "next/link"

export default async function HomeShop({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = Number(searchParams.page)

  const data = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(5)
    .offset(5 * (page - 1))

  // console.log(`::::::::::::PAGE ${searchParams.page}:::::::::::`)

  return (
    <main className="relative">
      <H1>Shop</H1>

      <FilterSection />
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

      <PageNavigation />
    </main>
  )
}
