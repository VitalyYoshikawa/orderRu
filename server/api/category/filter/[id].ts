import {H3Event} from "h3"
import {BACKEND_DOMAIN} from "~/const/common"
import qs from 'qs'
import {Filter} from "~/interfaces/category"

export default defineEventHandler(async (event: H3Event) => {
    const id = getRouterParam(event, 'id')

    const query = qs.stringify(
        {
            filters: {
                url: {
                    $eq: id
                }
            },
            populate: {
                attributes: {
                    populate: 'attribute_values'
                }
            },
            fields: ['id'],
        },
        {
            encodeValuesOnly: true,
        }
    )

    const { data } = await $fetch<any>(`${BACKEND_DOMAIN}/api/categories?${query}`)

    console.log(data)

    const result: Filter[] = data[0]?.attributes?.map((attribute: any) => ({
        type: attribute.type,
        label: attribute.name,
        name: attribute.name,
        options: attribute.attribute_values?.map((value: any) => ({
            value: value.value,
            label: value.name,
        })) || []
    })) || []

    return result
})
