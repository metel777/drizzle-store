import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu"
import { ArrowDownUp, ChevronDown } from "lucide-react"

export default function FilterSection() {
  return (
    <main>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center justify-between bg-fill hover:text-text-strong rounded-md w-32 px-2 py-1 transition-all">
          Order by <ChevronDown size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="capitalize shadow-xl">
          <DropdownMenuItem>price</DropdownMenuItem>
          <DropdownMenuItem>newest</DropdownMenuItem>
          <DropdownMenuItem>name</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  )
}
