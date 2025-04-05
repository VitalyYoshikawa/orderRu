import { H3Event } from "h3"
import { BACKEND_DOMAIN } from "~/const/common"
import qs from 'qs'
import { AttributeData, Filter, QueryParams } from "~/interfaces/category"

interface DynamicEntityConfig {
    path: string[]
}

const ENTITY_CONFIGS: Record<string, DynamicEntityConfig> = {
    'cat_': {
        path: ['attributes']
    },
    'subcat_': {
        path: ['category', 'attributes']
    },
    'type_': {
        path: ['subcategory', 'category', 'attributes']
    }
}

const buildDynamicQuery = (id: string): [string, QueryParams] | null => {
    const prefix = Object.keys(ENTITY_CONFIGS).find(p => id.startsWith(p))
    if (!prefix) return null

    const entityType = prefix === 'cat_' ? 'categories' :
        prefix === 'subcat_' ? 'subcategories' : 'type-products'

    const populate: Record<string, any> = {}
    let current = populate
    const config = ENTITY_CONFIGS[prefix]

    config.path.forEach((path, index) => {
        current[path] = index === config.path.length - 1
            ? { populate: 'attribute_values' }
            : { populate: {} }
        current = current[path].populate
    })

    const queryParams: QueryParams = {
        filters: { url: { $eq: id } },
        populate,
        fields: ['id']
    }

    return [entityType, queryParams]
}

const getNestedAttributes = (data: any, path: string[]): AttributeData[] | null => {
    let result = data[0]
    for (const key of path) {
        if (!result?.[key]) return null
        result = result[key]
    }
    return result
}

const formatDynamicFilters = (attributes: AttributeData[] | null): Filter[] => {
    return attributes?.map(attribute => ({
        type: attribute.type,
        label: attribute.name,
        name: attribute.name,
        options: attribute.attribute_values?.map(value => ({
            value: value.value,
            label: value.name
        })) || []
    })) || []
}

export default defineEventHandler(async (event: H3Event): Promise<Filter[] | null> => {
    const id = getRouterParam(event, 'id')
    if (!id) return null

    const queryData = buildDynamicQuery(id)
    if (!queryData) return null

    const [entity, queryParams] = queryData
    const { data } = await $fetch<any>(
        `${BACKEND_DOMAIN}/api/${entity}?${qs.stringify(queryParams, { encodeValuesOnly: true })}`
    )

    if (!data?.length) return null

    const prefix = Object.keys(ENTITY_CONFIGS).find(p => id.startsWith(p))
    if (!prefix) return null

    const attributes = getNestedAttributes(data, ENTITY_CONFIGS[prefix].path)
    return formatDynamicFilters(attributes)
})
