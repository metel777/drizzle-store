'use server'

import { createAuthSession, destroySession, verifyAuthSession } from "@/lib/auth"
import { hashUserPassword, verifyPassword } from "@/lib/hash"
import { createUser, getUserByEmail } from "@/actions/user"
import { redirect } from "next/navigation"


export async function signup(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    let errors = {} as { email: string, password: string }

    if (!email.includes('@')) {
        errors.email = 'Please enter a valid email adress.'
    }

    if (password.trim().length < 8) {
        errors.password = 'Password must be at least 8 characters long.'
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors
        }
    }

    const hashedPassword = hashUserPassword(password)
    try {
        const id = await createUser(email, hashedPassword)
        await createAuthSession(id as any)
        redirect('/')
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            return {
                errors: {
                    email: 'It seems like an account for chosen email already exists.'
                }
            }
        }
        throw error
    }

}

export async function signin(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const res = await getUserByEmail(email)
    const existingUser = res[0]

    if (!existingUser) {
        return {
            errors: {
                email: 'Could not authenticate user, please check your credentials.'
            }
        }
    }
    const isValidPassword = verifyPassword(existingUser.password, password)

    if (!isValidPassword) {
        return {
            errors: {
                password: 'Could not authenticate user, please check your credentials.'
            }
        }
    }

    await createAuthSession(existingUser.id as any)
    redirect('/')
}

export async function auth(
    mode: 'signup' | 'signin',
    prevState: any,
    formData: FormData) {
    if (mode === 'signin') {
        return signin(prevState, formData)
    }
    return signup(prevState, formData)

}

export async function logout() {
   await destroySession()
   redirect('/')
}

