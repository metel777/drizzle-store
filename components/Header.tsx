import Link from "next/link"
import { Button } from "./ui/button"
import { verifyAuthSession } from "@/lib/auth"
import ProfileDropdown from "./reusable/profile-dropdown"
import { ArrowRight } from "lucide-react"

export default async function Header() {
  const isSignedIn = await verifyAuthSession()

  return (
    <header className="w-full  bg-neutral-800 border-b  mb-5 fixed z-50">
      <main className="max-w-[1200px] mx-auto h-16 text-neutral-300 flex items-center justify-between">
        <section className="gap-6 hidden md:flex">
          <LinkWithArrow title="Shop" href="/" />
          <LinkWithArrow title="Cart" href="/cart" />
          <LinkWithArrow title="Orders" href="/profile/orders" />

          {isSignedIn.user ? (
            <>
              <LinkWithArrow title="Edit products" href="/admin/products" />
              {/* <LinkWithArrow title="Add product" href="/admin/add-product" /> */}
              {/* <form action="/api/insert-values" method="post">
                <Button type="submit" className="h-min" size="sm">
                  Insert default values
                </Button>
              </form> */}
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

function LinkWithArrow({ title, href }: { title: string; href: string }) {
  return (
    <Link className="hover:underline flex items-center group" href={href}>
      {title}
      <ArrowRight
        className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
        width={16}
      />
    </Link>
  )
}
