"use client"
import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useFormState } from "react-dom"
import { formMessages, signin, signup } from "@/actions/auth"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

export default function SignUp() {

  const initialState = {
    errors: { email: "", password: "", status: "" },
  } as formMessages

  const [formState, formAction] = useFormState(signup, initialState)

  function handleClick() {
    if (!formState.errors.email && !formState.errors.password) {
      toast({
        title: "Succes",
      })
    }
  }

  return (
    <main className="bg-white w-[400px] rounded-sm mx-auto">
      <form action={formAction} className="">
        <section className="px-4 text-center pt-4">
          <H1>Sign Up</H1>
        </section>
        <hr />
        <section className="p-4 flex flex-col gap-2">
          <Label htmlFor="email">Your email address</Label>
          <Input placeholder="Email" name="email" />
          {formState.errors.email && (
            <p className="text-red-500 text-sm -mt-2">
              {formState.errors.email}
            </p>
          )}
          <Label htmlFor="password">Password</Label>
          <Input placeholder="Password" name="password" />
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input placeholder="Confirm password" name="confirmPassword" />
          {formState.errors.password && (
            <p className="text-red-500 text-sm -mt-2">
              {formState.errors.password}
            </p>
          )}
          <Button  type="submit" className="mt-5">
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
