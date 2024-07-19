"use client"

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { Loader2Icon } from "lucide-react"

export default function AuthBtn({ variant }: { variant: "signin" | "signup" }) {
  const status = useFormStatus()

  return (
    <Button disabled={status.pending} type="submit" className="mt-5">
      {status.pending && <Loader2Icon className="animate-spin" />}
      Sign {variant === "signin" ? "in" : "up"}
    </Button>
  )
}
