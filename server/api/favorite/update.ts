import {H3Event} from "h3"
import protectedFetch from "~/utils/protectedFetch"


export default defineEventHandler(async (event: H3Event): Promise<any | undefined> => {
    const dataBody = await readBody(event)

    const data = await protectedFetch(event, '/favorite/update', dataBody)

    if (!data) return undefined

    return data
})
