import {H3Event} from "h3"
import {BACKEND_DOMAIN} from "~/const/common"
import qs from 'qs'
import type {Card} from "~/interfaces/product"

interface EntityConfig {
    filterPath: Array<string>
}

const ENTITY_CONFIGS: Record<string, EntityConfig> = {
    'cat_': {
        filterPath: ['type_product', 'subcategory', 'category', 'url']
    },
    'subcat_': {
        filterPath: ['type_product', 'subcategory', 'url']
    },
    'type_': {
        filterPath: ['type_product', 'url']
    }
}

const buildQueryParams = (id: string, filters: string[] | Array<string>[]): string => {
    const prefix = Object.keys(ENTITY_CONFIGS).find(p => id.startsWith(p)) || 'cat_'
    const config = ENTITY_CONFIGS[prefix]

    const filterObj: Record<string, any> = {}

    if (filters.length) {
        filters.forEach((val, index) => {
            if (Array.isArray(val)) {
                filterObj['$or'] = val.map(filterValue => ({
                    attribute_values: {
                        value: {$eq: filterValue}
                    }
                }))
            } else {
                filterObj['$and'] = filterObj['$and'] || []
                filterObj['$and'].push({
                    attribute_values: {
                        value: {$eq: val}
                    }
                })
            }
        })
    }

    let current = filterObj
    config.filterPath.forEach((part, idx) => {
        current[part] = idx === config.filterPath.length - 1
            ? {$eq: id}
            : {}
        current = current[part]
    })

    const query = {
        filters: filterObj,
        populate: {
            media: {
                fields: ['url']
            }
        }
    }

    return qs.stringify(query, {encodeValuesOnly: true})
}

const formatProductCard = (product: any): Card => {
    return {
        id: product.documentId,
        name: product.name,
        images: product.media?.map((image: any) => `${BACKEND_DOMAIN}${image.url}`) || [],
        price: product.price ? product.price : product.original_price,
        originalPrice: product.price ? product.original_price : null,
        url: product.url,
        count: product.count
    }
}

const parseFilters = (filter: object): string[] | Array<string>[] => {
    return Object.values(filter).map(item =>
        typeof item === 'string' && item.includes('%') ? item.split('%') : item
    )
}

export default defineEventHandler(async (event: H3Event): Promise<Card[]> => {
    const id = getRouterParam(event, 'id')
    const filter = await readBody(event)

    if (!id) return []

    const filterStr = parseFilters(filter)
    const query = buildQueryParams(id, filterStr)

    const {data} = await $fetch<any>(
        `${BACKEND_DOMAIN}/api/products?${query}`
    )

    if (!data?.length) return []

    return data?.map((item: any) => formatProductCard(item)) || []

})
