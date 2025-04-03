import { H3Event } from "h3"
import { BACKEND_DOMAIN } from "~/const/common"
import qs from 'qs'
import {Breadcrumb, Seo} from "~/interfaces/seo"

const buildQuery = (type: string, pathId: string): string => {
    const baseQuery = {
        filters: { url: { $eq: pathId } },
        fields: ['id', 'name', 'url'],
        populate: {} as Record<string, any>
    }

    switch (true) {
        case pathId.startsWith('cat_'):
            return `categories?${qs.stringify(baseQuery, { encodeValuesOnly: true })}`
        case pathId.startsWith('subcat_'):
            baseQuery.populate.category = { fields: ['id', 'name', 'url'] }
            return `subcategories?${qs.stringify(baseQuery, { encodeValuesOnly: true })}`
        case pathId.startsWith('type_'):
            baseQuery.populate.subcategory = {
                fields: ['id', 'name', 'url'],
                populate: { category: { fields: ['id', 'name', 'url'] } }
            }
            return `type-products?${qs.stringify(baseQuery, { encodeValuesOnly: true })}`
        default:
            if (type === 'products') {
                baseQuery.populate.type_product = {
                    fields: ['id', 'name', 'url'],
                    populate: {
                        subcategory: {
                            fields: ['id', 'name', 'url'],
                            populate: { category: { fields: ['id', 'name', 'url'] } }
                        }
                    }
                }
                return `products?${qs.stringify(baseQuery, { encodeValuesOnly: true })}`
            }
            return ''
    }
}

const buildBreadcrumbs = (data: any): Seo => {
    const breadcrumbs: Breadcrumb[] = []
    let current = data[0]

    while (current) {
        breadcrumbs.unshift({ name: current.name, url: `/categories/${current.url}` })
        current = current.type_product || current.subcategory || current.category
    }

    return { title: data[0].name, breadcrumbs }
}

export default defineEventHandler(async (event: H3Event): Promise<Seo | null> => {
    const { pathName, pathId } = await readBody(event)
    const type = pathName.replace('-id', '')
    const query = buildQuery(type, pathId)

    if (!query) throw createError({ statusCode: 400, message: 'Invalid path' })

    const { data } = await $fetch<any>(`${BACKEND_DOMAIN}/api/${query}`)

    if (!data || data.length === 0) {
        return null
    }

    return buildBreadcrumbs(data)
})
