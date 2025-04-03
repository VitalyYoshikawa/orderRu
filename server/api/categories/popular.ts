import {H3Event} from "h3"
import {BACKEND_DOMAIN} from "~/const/common"
import qs from 'qs'
import {CategoryLink} from "~/interfaces/category"

export default defineEventHandler(async (event: H3Event): Promise<CategoryLink[] | null> => {
    const id = getRouterParam(event, 'id')

    const query = qs.stringify(
        {
            fields: ['name', 'url'],
            pagination: {
                limit: 3
            }
        },
        {
            encodeValuesOnly: true,
        }
    )

    const { data } = await $fetch<any>(`${BACKEND_DOMAIN}/api/categories?${query}`)

    if (!data || data.length === 0) {
        return null
    }

    return data
})
