
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu"
import { ArrowDownUp, ChevronDown } from "lucide-react"

export default function FilterSection() {
  return (
    <main className="w-full  h-full -left-[320px] rounded-sm">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center hover:text-text-strong ring-0 focus:right-0">
          Order <ArrowDownUp size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="capitalize">
          <DropdownMenuItem>price</DropdownMenuItem>
          <DropdownMenuItem>newest</DropdownMenuItem>
          <DropdownMenuItem>name</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  )
}
