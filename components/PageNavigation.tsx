"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "./ui/button"

type Props = {}
export default function PageNavigation({}: Props) {
  const numbers10 = Array.from({ length: 15 }, (_, i) => i + 1)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const params = new URLSearchParams(searchParams.toString())

  function handleClick(value: any) {
    params.set("page", value)

    router.push(pathname + "?" + params)
  }

  return (
    <main className="bg-white mt-5 py-2 rounded-sm">
      {numbers10.map((item) => (
        <Button onClick={() => handleClick(item)} variant="outline" size="icon" key={item}>
          {item}
        </Button>
      ))}
    </main>
  )
}
