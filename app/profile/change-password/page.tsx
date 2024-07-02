import { H1 } from "@/components/reusable/titles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { verifyAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const { user } = await verifyAuthSession()
  if (!user) {
    redirect("/auth?m=singin")
  }

  return (
    <main className="pl-4">
      <H1>Change your password</H1>
      <form className="flex flex-col gap-2 w-[300px]">
        <div>
          <Label>Your old password</Label>
          <Input placeholder="Enter your old password" />
        </div>
        <div>
          <Label>Your new password</Label>
          <Input placeholder="Enter your new password" />
        </div>
        <div>
          <Label>Confirm your new password</Label>
          <Input placeholder="Enter your new password" />
        </div>
        <Button>Change password</Button>
      </form>
    </main>
  )
}
