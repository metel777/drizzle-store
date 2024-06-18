import { eq } from 'drizzle-orm';
import { db } from '@/database/database';
import { users } from '@/database/schema';

export async function createUser(email: string, password: string) {
  await db.insert(users).values({ email, password });

  //select last inserted user and return [{userId: number}]
  const lastInsertedUser = await db.select(({ userId: users.id })).from(users).where(eq(users.email, email))

  return lastInsertedUser[0].userId
}

export async function getUserByEmail(email: string) {
  return db.select().from(users).where(eq(users.email, email))
}