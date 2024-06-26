import Link from "next/link"
import { Button } from "./ui/button"
import { verifyAuthSession } from "@/lib/auth"
import ProfileDropdown from "./reusable/profile-dropdown"


export default async function Header() {
  const isSignedIn = await verifyAuthSession()

  return (
    <header className="w-full  bg-neutral-800 border-b  mb-5 fixed z-50">
      <main className="max-w-[1200px] mx-auto h-16 text-neutral-300 flex items-center justify-between">
        <section className="gap-6 hidden md:flex">
          <Link className="hover:underline" href="/">
            Shop
          </Link>
          <Link className="hover:underline" href="/cart">
            Cart
          </Link>
          {isSignedIn.user ? (
            <>
              <Link className="hover:underline" href="/checkout">
                Checkout
              </Link>
              <Link className="hover:underline" href="/admin/products">
                Edit products
              </Link>
              <Link className="hover:underline" href="/admin/add-product">
                Add product
              </Link>
              <form action="/api/insert-values" method="post">
                <Button type="submit" className="h-min" size="sm">
                  Insert default values
                </Button>
              </form>
            </>
          ) : (
            ""
          )}
        </section>
        <section className="flex gap-2">
          {!isSignedIn.user ? (
            <>
              <Link className="hover:underline" href="/auth/signup">
                <Button>Sign up</Button>
              </Link>
              <Link className="hover:underline" href="/auth/signin">
                <Button variant="ghost">Sign in</Button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </section>
      </main>
    </header>
  )
}
