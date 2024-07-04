"use client"

import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { signup } from "@/actions/auth"
import { Label } from "@/components/ui/label"
import { useFormState } from "react-dom"
const initialState = {
  error: {
    email: "",
    password: "",
  },
}
export default function SignUp() {
  const [state, action] = useFormState(signup, initialState)

  return (
    <main className="bg-white w-[400px] rounded-sm mx-auto">
      <form action={action}>
        <section className="px-4 text-center pt-4">
          <H1>Sign Up</H1>
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
            className={`${
              state.error.password ===
                "Password must be at least 8 characters long." &&
              "border-red-500"
            }`}
            placeholder="Password"
            name="password"
          />

          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            className={`${
              state.error.password !==
                "Password must be at least 8 characters long." && state.error.password  &&
              "border-red-500"
            }`}
            placeholder="Confirm password"
            name="confirmPassword"
          />
          {state.error.email && (
            <p className="text-sm text-red-500">{state.error.email}</p>
          )}
          {state.error.password && (
            <p className="text-sm text-red-500">{state.error.password}</p>
          )}
          <Button type="submit" className="mt-5">
            Sign up
          </Button>
          <Link
            className="text-sm hover:underline text-neutral-500"
            href={"/auth/signin"}
          >
            Already have an account?
          </Link>
        </section>
      </form>
    </main>
  )
}
