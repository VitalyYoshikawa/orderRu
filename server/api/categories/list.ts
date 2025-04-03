import {H3Event} from "h3"
import {BACKEND_DOMAIN} from "~/const/common"
import qs from 'qs'
import {CategoryListLink} from "~/interfaces/category"

export default defineEventHandler(async (event: H3Event): Promise<CategoryListLink[] | null> => {
    const id = getRouterParam(event, 'id')

    const query = qs.stringify(
        {
            populate: {
                subcategories: {
                    fields: ['name', 'url'],
                }
            },
            fields: ['name', 'url'],
            pagination: {
                limit: 4
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
