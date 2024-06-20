"use client"

import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import { useFormState } from "react-dom"

import { auth, formMessages, signin, signup } from "@/actions/auth"
import { useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

type Props = {}
export default function AuthForm({}: Props) {
  const searchParams = useSearchParams()
  const authMode = searchParams.get("m") as "signup" | "signin"

  const initialState = {
    errors: { email: "", password: "" },
  } as formMessages

  const [formState, formAction] = useFormState(signup, initialState)

  function handleClick() {
    if (!formState.errors.email && !formState.errors.password) {
      toast({
        title: "Succes",
      })
    }
  }

  const authText = authMode === "signup" ? "Sign up" : "Sign in"
  return (
    <main className="bg-white w-[400px] mx-auto">
      <form action={formAction} className="">
        <section className="px-4 text-center pt-4">
          <H1>{authText}</H1>
        </section>
        <hr />
        <section className="p-4 flex flex-col gap-2">
          <Input placeholder="Email" name="email" />
          {formState.errors.email && (
            <p className="text-red-500 text-sm -mt-2">
              {formState.errors.email}
            </p>
          )}

          <Input placeholder="Password" name="password" />

          {authMode === "signup" && (
            <Input placeholder="Confirm password" name="confirmPassword" />
          )}
          {formState.errors.password && (
            <p className="text-red-500 text-sm -mt-2">
              {formState.errors.password}
            </p>
          )}

          <Button onClick={() => handleClick()} type="submit" className="mt-5">
            {authText}
          </Button>
          <Link
            className="text-sm hover:underline text-neutral-500"
            href={authMode === "signup" ? "/auth?m=signin" : "/auth?m=signup"}
          >
            {authMode === "signup"
              ? "Already have an account?"
              : "  Doesnt have an account?"}
          </Link>
        </section>
      </form>
    </main>
  )
}
