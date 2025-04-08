import {H3Event} from "h3"
import protectedFetch from "~/utils/protectedFetch"


export default defineEventHandler(async (event: H3Event): Promise<any | undefined> => {
    const data = await protectedFetch(event, '/user/info')

    if (!data) return undefined

    return data
})
