import { eq } from 'drizzle-orm';
import { db } from '@/database/database';
import { users } from '@/database/schema';

export async function getUserByEmail(email: string) {
  return db.select().from(users).where(eq(users.email, email))
}