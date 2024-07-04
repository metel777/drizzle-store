'use server'

import { db } from "@/database/database"
import { users } from "@/database/schema"
import { verifyAuthSession } from "@/lib/auth"
import { hashPassword } from "@/lib/hash"
import { verify } from "argon2"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

interface ActionResult {
    error: {
        oldPassword?: string
        newPassword?: string
        confirmNewPassword?: string
    }
}

export async function changePassword(_: ActionResult, formData: FormData): Promise<ActionResult> {
    const oldPassword = formData.get('oldPassword') as string
    const newPassword = formData.get('newPassword') as string
    const confirmNewPassword = formData.get('confirmNewPassword') as string

    const { user } = await verifyAuthSession()

    if (oldPassword.trim().length < 8) {
        _.error.oldPassword = 'Enter a valid password.'
        return _
    }
    _.error.oldPassword = ''

    if (newPassword.trim().length < 8) {
        _.error.newPassword = 'Password must be at least 8 characters long.'
        return _
    }
    _.error.newPassword = ''
    if (newPassword !== confirmNewPassword) {
        _.error.confirmNewPassword = 'Passwords doesnt match.'
        _.error.newPassword = 'Passwords doesnt match.'

        return _
    }
    _.error.oldPassword = ''
    _.error.newPassword = ''

    const passwordFromDb = await db.select().from(users).where(eq(users.id, user?.id as any))
    const verifyPassword = await verify(passwordFromDb[0].passwordHash, oldPassword)

    if (!verifyPassword) {
        _.error.oldPassword = 'Wrong password.'
        return _
    }

    const hashedPassword = await hashPassword(newPassword)
    await db.update(users).set({ passwordHash: hashedPassword }).where(eq(users.id, user?.id as any))
    return redirect('/profile/change-password')
}