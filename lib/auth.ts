import { Lucia } from "lucia";
import { DrizzleMySQLAdapter } from '@lucia-auth/adapter-drizzle'
import { db } from "../database/database";
import { sessions, users } from "../database/schema";
import { cookies } from "next/headers";

const adapter = new DrizzleMySQLAdapter(db, sessions as any, users as any) //sesion and users type error



const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    }
})

export async function createAuthSession(userId: string) {
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}

export async function verifyAuthSession() {
    const sessionCookie = cookies().get(lucia.sessionCookieName)

    if (!sessionCookie) {
        return {
            user: null,
            session: null
        }
    }

    const sessionId = sessionCookie.value

    if (!sessionId) {
        return {
            user: null,
            session: null
        }
    }

    const result = await lucia.validateSession(sessionId)

    try {
        if (result.session && result.session.fresh) {
            lucia.createSessionCookie(result.session.id)
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                // sessionCookie.attributes
            )
        }
        if (!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie()
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            )
        }
    } catch { }



    return result
}

export async function destroySession() {
    const { session } = await verifyAuthSession()
    if (!session) {
        return {
            error: 'Unothorized!'
        }
    }

    await lucia.invalidateSession(session.id)
    
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )
}