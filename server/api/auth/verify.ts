import {H3Event} from "h3";
import {BACKEND_DOMAIN} from "~/const/common"

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const authData = await readBody(event)

    const refresh_tokenCookie = getCookie(event, 'refresh_token')

    if (refresh_tokenCookie) return undefined

    const {access_token, refresh_token} = await $fetch<any>(
        `${BACKEND_DOMAIN}/api/auth/verify-otp`,
        {
            method: "POST",
            body: {
                phone: authData.phone,
                code: authData.code
            },
        }
    )

    if (!access_token && !refresh_token) return undefined

    setCookie(event, 'access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })

    setCookie(event, 'refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })

    setCookie(event, 'auth', 'true')

    return {success: true}
})
