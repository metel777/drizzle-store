import {
  ChangeIcon,
  ChangePasswordIcon,
  ChangePaymentIcon,
  ChangeShippingIcon,
  FavouritesIcon,
  OrdersIcon,
} from "@/components/icons"
import { H1 } from "@/components/reusable/titles"
import { verifyAuthSession } from "@/lib/auth"
import { C } from "@/types/react-child"
import Link from "next/link"
import { redirect } from "next/navigation"

type Props = { children: React.ReactNode }
export default async function ProfilePage({ children }: Props) {
  const { user } = await verifyAuthSession()
  if (!user) {
    redirect("/auth/signin")
  }
  return (
    <main className="flex flex-col items-center md:items-start md:flex-row ">
      <main>
        <nav className=" md:w-[250px] grid grid-cols-2 md:block  md:border-r">
          <NavSection name="Profile">
            <Link href="/profile/orders">
              <ListItem>
                <OrdersIcon />
                Your orders
              </ListItem>
            </Link>
            {/* <ListItem>
              <FavouritesIcon />
              Favourites
            </ListItem> */}
          </NavSection>
          <hr className="hidden md:block" />
          <NavSection name="Profile settings">
            {/* <ListItem>
              <ChangeIcon />
              Change credentials
            </ListItem> */}
            <Link href="/profile/change-password">
              <ListItem>
                <ChangePasswordIcon />
                Change password
              </ListItem>
            </Link>
            {/* <ListItem>
              <ChangeShippingIcon />
              Change shipping adress
            </ListItem>
            <ListItem>
              <ChangePaymentIcon />
              Change payment method
            </ListItem> */}
          </NavSection>
        </nav>
      </main>
      <main className="w-full h-24 pl-6">{children}</main>
    </main>
  )
}

type NavSectionType = {
  children: React.ReactNode
  name: string
}

function NavSection({ children, name }: NavSectionType) {
  return (
    <div className="py-2">
      <span className="uppercase tracking-wide  cursor-default">{name}</span>
      <ul className=" mt-2">{children}</ul>
    </div>
  )
}

function ListItem({ children }: C) {
  return (
    <li className="hover:bg-fill text-text-weak hover:text-text-strong cursor-pointer flex gap-3 rounded-lg p-2 group">
      {children}
    </li>
  )
}
