import { H3Event } from "h3"
import { BACKEND_DOMAIN } from "~/const/common"
import qs from 'qs'
import { Breadcrumb, Seo } from "~/interfaces/seo"

interface EntityConfig {
    endpoint: string
    populatePath: string[]
    fields: string[]
}

const ENTITY_CONFIGS: Record<string, EntityConfig> = {
    'cat_': {
        endpoint: 'categories',
        populatePath: [],
        fields: ['id', 'name', 'url']
    },
    'subcat_': {
        endpoint: 'subcategories',
        populatePath: ['category'],
        fields: ['id', 'name', 'url']
    },
    'type_': {
        endpoint: 'type-products',
        populatePath: ['subcategory', 'category'],
        fields: ['id', 'name', 'url']
    },
    'product': {
        endpoint: 'products',
        populatePath: ['type_product', 'subcategory', 'category'],
        fields: ['id', 'name', 'url']
    }
}

const buildDynamicQuery = (type: string, pathId: string): string => {
    const prefix = Object.keys(ENTITY_CONFIGS).find(p => pathId.startsWith(p)) ||
        (type === 'products' ? 'product' : null)

    if (!prefix) return ''

    const config = ENTITY_CONFIGS[prefix]
    const baseQuery = {
        filters: { url: { $eq: pathId } },
        fields: config.fields,
        populate: {} as Record<string, any>
    }

    let currentPopulate = baseQuery.populate
    config.populatePath.forEach((path, index) => {
        currentPopulate[path] = {
            fields: config.fields,
            ...(index < config.populatePath.length - 1 ? { populate: {} } : {})
        }
        currentPopulate = currentPopulate[path].populate || {}
    })

    return `${config.endpoint}?${qs.stringify(baseQuery, { encodeValuesOnly: true })}`
}

const buildBreadcrumbs = (data: any): Seo => {
    const breadcrumbs: Breadcrumb[] = []
    let current = data[0]

    const relationFields = ['type_product', 'subcategory', 'category']

    while (current) {
        breadcrumbs.unshift({
            name: current.name,
            url: `/categories/${current.url}`
        })

        current = relationFields.reduce((acc, field) => acc || current[field], null)
    }

    return {
        title: data[0]?.name || '',
        breadcrumbs
    }
}

export default defineEventHandler(async (event: H3Event): Promise<Seo | null> => {
    const { pathName, pathId } = await readBody(event)
    const type = pathName.replace('-id', '')
    const query = buildDynamicQuery(type, pathId)

    if (!query) {
        throw createError({ statusCode: 400, message: 'Invalid path' })
    }

    try {
        const { data } = await $fetch<{ data: any[] }>(`${BACKEND_DOMAIN}/api/${query}`)

        if (!data?.length) return null

        return buildBreadcrumbs(data)
    } catch (error) {
        console.error('Error fetching SEO data:', error)
        throw createError({ statusCode: 500, message: 'Failed to load SEO data' })
    }
})
