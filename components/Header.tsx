import Link from "next/link"
import { Button } from "./ui/button"
import { verifyAuthSession } from "@/lib/auth"
import { logout } from "@/actions/auth"
export default async function Header() {
  const isSignedIn = await verifyAuthSession()

  return (
    <header className="w-full  bg-white border-b  mb-5 fixed">
      <main className="max-w-[1200px] mx-auto h-16 text-neutral-700 flex items-center justify-between">
        <section className="flex gap-6">
          <Link className="hover:underline" href="/">
            Shop
          </Link>
          <Link className="hover:underline" href="/cart">
            Cart
          </Link>
          <Link className="hover:underline" href="/checkout">
            Checkout
          </Link>
          <Link className="hover:underline" href="/admin/products">
            Edit products
          </Link>
          <Link className="hover:underline" href="/admin/add-product">
            Add product
          </Link>
        </section>
        <section className="flex gap-2">
          {!isSignedIn.user ? (
            <>
              <Link className="hover:underline" href="/auth?m=signup">
                <Button>Sign up</Button>
              </Link>
              <Link className="hover:underline" href="/auth?m=signin">
                <Button variant="ghost">Sign in</Button>
              </Link>
            </>
          ) : (
            <form action={logout}>
              <Button type="submit" variant="ghost">
                Sign out
              </Button>
            </form>
          )}
        </section>
      </main>
    </header>
  )
}
