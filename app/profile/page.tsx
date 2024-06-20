import { H1 } from "@/components/reusable/titles"
import { verifyAuthSession } from "@/lib/auth"
import { C } from "@/types/child"
import { redirect } from "next/navigation"

type Props = {}
export default async function ProfilePage({}: Props) {
  const { user } = await verifyAuthSession()
  if (!user) {
    redirect("/auth?m=singin")
  }
  return (
    <>
      <H1>Profile</H1>
      <main className="h-screen">
        <nav className="w-[250px] bg-fill ">
          <NavSection name="Profile">
            <ListItem>Your orders</ListItem>
            <ListItem>Favourites</ListItem>
          </NavSection>
          <hr />
          <NavSection name="Profile settings">
            <ListItem>Change credentials</ListItem>
            <ListItem>Change password</ListItem>
            <ListItem>Change shipping adress</ListItem>
            <ListItem>Change payment method</ListItem>
          </NavSection>
        </nav>
      </main>
    </>
  )
}

type NavSectionType = {
  children: React.ReactNode
  name: string
}

function NavSection({ children, name }: NavSectionType) {
  return (
    <div className="p-2">
      <span className="uppercase tracking-wide text-neutral-500  cursor-default">
        {name}
      </span>
      <ul className="bg-fill mt-2">{children}</ul>
    </div>
  )
}

function ListItem({ children }: C) {
  return (
    <li className="border border-l-4 border-transparent hover:border-l-brand   hover:bg-neutral-50 cursor-pointer flex flex-col rounded-lg p-2">
      {children}
    </li>
  )
}
