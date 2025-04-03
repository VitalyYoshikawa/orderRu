import { H3Event } from "h3"
import { BACKEND_DOMAIN } from "~/const/common"
import qs from 'qs'
import {AttributeData, Filter, QueryParams} from "~/interfaces/category"

const buildQuery = (id: string): [string, QueryParams] | null => {
    const baseParams: QueryParams = {
        filters: { url: { $eq: id } },
        populate: {},
        fields: ['id']
    }

    switch (true) {
        case id.startsWith('cat_'):
            baseParams.populate.attributes = { populate: 'attribute_values' }
            return ['categories', baseParams]

        case id.startsWith('subcat_'):
            baseParams.populate.category = {
                populate: { attributes: { populate: 'attribute_values' } }
            }
            return ['subcategories', baseParams]

        case id.startsWith('type_'):
            baseParams.populate.subcategory = {
                populate: {
                    category: {
                        populate: { attributes: { populate: 'attribute_values' } }
                    }
                }
            }
            return ['type_products', baseParams]

        default:
            return null
    }
}

const extractAttributes = (data: any, id: string): AttributeData[] | null => {
    const item = data[0]

    switch (true) {
        case id.startsWith('cat_'):
            return item.attributes
        case id.startsWith('subcat_'):
            return item.category?.attributes
        case id.startsWith('type_'):
            return item.subcategory?.category?.attributes
        default:
            return null
    }
}


const formatFilters = (attributes: AttributeData[]): Filter[] => {
    return attributes.map(attribute => ({
        type: attribute.type,
        label: attribute.name,
        name: attribute.name,
        options: attribute.attribute_values?.map(value => ({
            value: value.value,
            label: value.name
        })) || []
    }))
}

export default defineEventHandler(async (event: H3Event): Promise<Filter[] | null> => {
    const id = getRouterParam(event, 'id')
    if (!id) return null

    const queryData = buildQuery(id)
    if (!queryData) return null

    const [entity, queryParams] = queryData
    const { data } = await $fetch<any>(
        `${BACKEND_DOMAIN}/api/${entity}?${qs.stringify(queryParams, { encodeValuesOnly: true })}`
    )

    if (!data?.length) return null

    const attributes = extractAttributes(data, id)
    if (!attributes) return null

    return formatFilters(attributes)
})
