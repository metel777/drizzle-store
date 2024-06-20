'use server'

import { createAuthSession, destroySession } from "@/lib/auth"
import { hashUserPassword, verifyPassword } from "@/lib/hash"
import { createUser, getUserByEmail } from "@/actions/user"
import { redirect } from "next/navigation"

export type formMessages = {
    errors: {
        email?: string | null,
        password?: string | null,
    }

}

export async function signup(prevState: formMessages, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const CPassword = formData.get('confirmPassword') as string

    const errors = prevState.errors

    // :::::::: VALIDATION :::::::::
    if (!email.includes('@')) {
        errors.email = 'Please enter a valid email adress.'
    }
    if (password.trim().length < 8) {
        errors.password = 'Password must be at least 8 characters long.'
    }
    if (password !== CPassword) {
        errors.password = 'Passwords doesnt match.'
    }
    if(errors.email && errors.password){
        return prevState
    }

    const hashedPassword = hashUserPassword(password)
    try {
        const id = await createUser(email, hashedPassword)
        await createAuthSession(id as any)
        redirect('/')
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            return { errors: { email: 'It seems like an account for chosen email already exists.' } }
        }
        throw error
    }

}

export async function signin(prevState: formMessages, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const res = await getUserByEmail(email)
    const existingUser = res[0]

    if (!existingUser) {
        return { errors: { email: 'Could not authenticate user, please check your credentials.' } }
    }
    const isValidPassword = verifyPassword(existingUser.password, password)

    if (!isValidPassword) {
        return { errors: { password: 'Could not authenticate user, please check your credentials.' } }
    }

    await createAuthSession(existingUser.id as any)

    redirect('/')
}

export async function logout() {
    await destroySession()
    redirect('/')
}


