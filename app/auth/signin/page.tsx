"use client"

import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useFormState } from "react-dom"
import { signin } from "@/actions/auth"
import { Label } from "@/components/ui/label"
import AuthBtn from "@/components/reusable/auth-btn"

const initialState = {
  error: {
    email: "",
    password: "",
  },
}

export default function SignIn() {
  const [state, action] = useFormState(signin, initialState)
  return (
    <main className="bg-white w-[400px] rounded-sm mx-auto">
      <form action={action} className="">
        <section className="px-4 text-center pt-4">
          <H1>Sign In</H1>
        </section>
        <hr />
        <section className="p-4 flex flex-col gap-2">
          <Label htmlFor="email">Your email address</Label>
          <Input
            className={`${state.error.email && "border-red-500"}`}
            placeholder="Email"
            name="email"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            className={`${state.error.password && "border-red-500"}`}
            placeholder="Password"
            name="password"
          />
          {state.error.email && (
            <p className="text-sm text-red-500">{state.error.email}</p>
          )}
          {state.error.password && (
            <p className="text-sm text-red-500">{state.error.password}</p>
          )}

          <AuthBtn variant="signin" />
          <Link
            className="text-sm hover:underline text-neutral-500"
            href="/auth/signup"
          >
            Doesnt have an account?
          </Link>
        </section>
      </form>
    </main>
  )
}
