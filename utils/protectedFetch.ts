import { getCookie, setCookie, deleteCookie, type H3Event } from "h3"
import { BACKEND_DOMAIN } from "~/const/common"

export default async function fetchWithAuth(
    event: H3Event,
    endpoint: string,
    body: object = {}
): Promise<any> {
    const accessToken = getCookie(event, "access_token")
    const refreshToken = getCookie(event, "refresh_token")

    if (!accessToken && !refreshToken) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
    }

    const makeRequest = async (token: string) => {
        return await $fetch<any>(`${BACKEND_DOMAIN}/api${endpoint}`, {
            method: "POST",
            body: { access_token: token, ...body },
        })
    }

    try {
        return await makeRequest(accessToken!)
    } catch (error: any) {
        if (error?.response?.status !== 401 || !refreshToken) throw error

        try {
            const { access_token: newToken } = await $fetch<{access_token: string}>(
                `${BACKEND_DOMAIN}/api/auth/update-access-token`,
                { method: "POST", body: { refresh_token: refreshToken } }
            )

            setCookie(event, "access_token", newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })

            return await makeRequest(accessToken!)
        } catch (refreshError: any) {
            ["access_token", "refresh_token", "auth"].forEach(name => deleteCookie(event, name))

            throw createError({
                statusCode: refreshError?.response?.status || 401,
                statusMessage: "Session expired. Please re-login",
            })
        }
    }
}
