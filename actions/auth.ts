'use server'

import { createAuthSession, destroySession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { hash, verify } from 'argon2'
import { generateIdFromEntropySize } from "lucia"
import { db } from "@/database/database"
import { users } from "@/database/schema"
import { getUserByEmail } from "./user"
import { hashPassword } from "@/lib/hash"

export interface ActionResult {
    error: {
        email?: string
        password?: string
    };
}

export async function signup(_: ActionResult, formData: FormData): Promise<ActionResult> {
    // 'use server'

    const email = formData?.get('email') as string
    if (!email.includes('@') || typeof email !== "string") {
        _.error.email = 'Please enter a valid email adress.'
        return _
    }
    _.error.email = '' //reset state

    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string


    if (password.trim().length < 8) {
        _.error.password = 'Password must be at least 8 characters long.'
        return _
    }
    if (password !== confirmPassword) {
        _.error.password = 'Passwords doesnt match.'
        return _
    }
    _.error.password = '' //reset state



    const hashedPassword = await hashPassword(password)

    const userId = generateIdFromEntropySize(10);

    try {
        await db.insert(users).values({ email: email, id: userId, passwordHash: hashedPassword })
        await createAuthSession(userId as any)
        return redirect('/')
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            _.error.email = 'It seems like an account for chosen email already exists.'
            return _
        }
        throw error
    }

}



export async function signin(_: ActionResult, formData: FormData): Promise<ActionResult> {
    //email verification::::::::::::::
    const email = formData?.get('email') as string
    const user = await getUserByEmail(email)
    const existingUser = user[0]

    if (!email.includes('@') || typeof email !== "string") {
        _.error.email = 'Please enter a valid email adress.'
        return _
    }
    _.error.email = '' //reset state
    if (!existingUser) {
        _.error.email = 'Could not authenticate user, please check your credentials.'
        return _
    }
    _.error.email = '' //reset state

    //password verification:::::::::::::
    const password = formData.get('password') as string

    if (password.trim().length < 8) {
        _.error.password = 'Enter password.'
        return _
    }
    _.error.password = '' //reset state

    const validPassword = await verify(existingUser.passwordHash, password)

    if (!validPassword) {
        _.error.email = 'Could not authenticate user, please check your credentials.'
        return _
    }

    await createAuthSession(existingUser.id)
    redirect('/')
}

export async function logout() {
    await destroySession()
    redirect('/auth/signin')
}


