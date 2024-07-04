"use client"

import { changePassword } from "@/actions/profile"
import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "react-dom"

const initialState = {
  error: {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  },
}

export default function ProfilePage() {
  const [state, action] = useFormState(changePassword, initialState)

  const { confirmNewPassword, newPassword, oldPassword } = state?.error

  return (
    <main>
      <H1>Change your password</H1>
      <form action={action} className="flex flex-col gap-2 w-[300px]">
        <div>
          <Label>Your old password</Label>
          <Input
            className={`${oldPassword && "border-red-500"}`}
            name="oldPassword"
            placeholder="Enter your old password"
          />
          {oldPassword && <p className="text-sm text-red-500">{oldPassword}</p>}
        </div>
        <div>
          <Label>Your new password</Label>
          <Input
            className={`${newPassword && "border-red-500"}`}
            name="newPassword"
            placeholder="Enter your new password"
          />
          
        </div>
        <div>
          <Label>Confirm your new password</Label>
          <Input
            className={`${confirmNewPassword && "border-red-500"}`}
            name="confirmNewPassword"
            placeholder="Enter your new password"
          />
          {confirmNewPassword && (
            <p className="text-sm text-red-500">{confirmNewPassword}</p>
          )}
        </div>

        <Button>Change password</Button>
      </form>
    </main>
  )
}
