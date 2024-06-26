import { H1 } from "@/components/reusable/titles"
import { verifyAuthSession } from "@/lib/auth"
import { C } from "@/types/react-child"

export default async function layout({ children }: C) {
  const result = await verifyAuthSession()

  if (!result.user) {
    return <H1>Sorry but you dont have acces to this page.</H1>
  }
  return <>{children}</>
}
