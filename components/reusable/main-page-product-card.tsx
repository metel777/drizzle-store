import Link from "next/link"
import { Button } from "../ui/button"
import AddToCartBtn from "./add-to-cart-btn"

type Props = {
  title: string
  imageUrl: string
  price: number
  id: any
  description: any
  editing: boolean
}
export default async function ProductCard({
  title,
  imageUrl,
  price,
  id,
  description,
  editing,
}: Props) {
  return (
    <main className="bg-white p-2 rounded-sm grid grid-rows-2 gap-2 border border-transparent hover:border-lime-500 hover:shadow-xl">
      <header>
        <Link href={`/product/${id}`}>
          <h3 className="text-xl font-bold text-text-strong">{title}</h3>
          <img className="w-full max-h-[120px]" src={imageUrl} alt="" />
        </Link>
      </header>
      <section>
        <h3 className="text-xl font-bold text-text-strong">$ {price}</h3>
        <p className="text-[15px] line-clamp-4  bg-white">{description}</p>
        <section className="mt-5">
          {editing ? (
            <main className="flex justify-between ">
              <Link href={`/admin/edit-product/${id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <form action="/api/delete-product" method="POST">
                <Button type="submit" variant="destructive">
                  Delete
                </Button>
                <input type="hidden" value={id} name="productId" />
              </form>
            </main>
          ) : (
            <section className="flex justify-between">
              <AddToCartBtn id={id} />
            </section>
          )}
        </section>
      </section>
    </main>
  )
}
