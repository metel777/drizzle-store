import { logout } from "@/actions/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserRound } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

type Props = {}
export default function ProfileDropdown({}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent hover:bg-white/10 h-10 w-10 flex items-center justify-center rounded-lg hover:bg-neutral-100">
        <UserRound />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] shadow-taobao">
        <DropdownMenuLabel className="text-text-strong">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem disabled> Settings</DropdownMenuItem>
        <DropdownMenuItem disabled> My adress</DropdownMenuItem>
        <DropdownMenuItem disabled> Payment</DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={logout} className="flex justify-center ">
          <Button type="submit" variant="link" className="w-full">
            Sign out
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
