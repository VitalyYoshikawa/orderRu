import {H3Event} from "h3";
import {BACKEND_DOMAIN} from "~/const/common"

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const authData = await readBody(event)
    const refresh_token = getCookie(event, 'refresh_token')

    if (refresh_token) return undefined

    const data = await $fetch<any>(
        `${BACKEND_DOMAIN}/api/auth/send-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                phone: authData.phone
            },
        }
    )


    if (!data) return undefined

     return {success: true}
})
