"use client"

import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CircleHelp } from "lucide-react"
import Link from "next/link"

import { useFormState } from "react-dom"

import { auth } from "@/actions/auth"
import { useSearchParams } from "next/navigation"

type Props = {}
export default function AuthForm({}: Props) {
  const searchParams = useSearchParams()
  const authMode = searchParams.get("m") as 'signup' | 'signin'

  const [formState, formAction] = useFormState<any>(
    auth.bind(null, authMode ),
    {}
  )



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
          <div className="flex items-center relative">
            <Input placeholder="Password" name="password"></Input>
            <CircleHelp size={20} className="absolute right-2" />
          </div>
          {formState?.errors && (
            <p className="text-red-500 text-sm">
              {Object.keys(formState.errors).map((error) => (
                <p key={error}>{formState.errors[error]}</p>
              ))}
            </p>
          )}
          <Button className="mt-5">{authText}</Button>
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
