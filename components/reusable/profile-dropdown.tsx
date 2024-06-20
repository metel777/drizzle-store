import { logout } from "@/actions/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CreditCard,
  Notebook,
  Settings,
  UserRound,
  UserRoundCog,
} from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

type Props = {}
export default function ProfileDropdown({}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border h-10 w-10 flex items-center justify-center rounded-lg hover:bg-neutral-100">
        <UserRound />
      </DropdownMenuTrigger>
      <DropdownMenuContent >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem> Settings</DropdownMenuItem>
        <DropdownMenuItem> My adress</DropdownMenuItem>
        <DropdownMenuItem> Payment</DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={logout} className="flex justify-center ">
          <Button type="submit" variant="link" className="w-full">
            Sign out
          </Button>
        </form>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><UserRoundCog className="mr-2 h-5 w-5 text-text-weak" /> Profile</DropdownMenuItem>
        <DropdownMenuItem><Settings className="mr-2 h-5 w-5 text-text-weak" />  Settings</DropdownMenuItem>
        <DropdownMenuItem><Notebook className="mr-2 h-5 w-5 text-text-weak" />My adress</DropdownMenuItem>
        <DropdownMenuItem><CreditCard className="mr-2 h-5 w-5 text-text-weak" /> Payment</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
