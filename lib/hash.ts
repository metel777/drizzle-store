import { hash } from "argon2";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    hashLength: 32,
    parallelism: 1
  })

  return hashedPassword
}