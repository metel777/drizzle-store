"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu"
import { ArrowDownUp, ChevronDown } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const orderVariants = ["price", "newest", "name"]

export default function FilterSection() {
  const [position, setPosition] = useState("newest")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const params = new URLSearchParams(searchParams.toString())

  function handleClick(value: string) {
    params.set("order", value)

    router.push(pathname + "?" + params)
  }
  return (
    <main>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center justify-between hover:text-text-strong rounded-md w-40 px-2 py-1.5 transition-all focus:border-0">
          Order by <ChevronDown size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="capitalize shadow-xl w-40 ">
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {orderVariants.map((item) => (
              <DropdownMenuRadioItem
                onClick={() => handleClick(item)}
                key={item}
                value={item}
                className="cursor-pointer"
              >
                {item}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  )
}
