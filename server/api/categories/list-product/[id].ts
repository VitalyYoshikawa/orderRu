import { H3Event } from "h3"
import { BACKEND_DOMAIN } from "~/const/common"
import qs from 'qs'
import type { Card } from "~/interfaces/product"
import {QueryParams} from "~/interfaces/category";


const buildQuery = (id: string): [string, QueryParams] | null => {
    const baseParams: QueryParams = {
        filters: { url: { $eq: id } },
        populate: {},
        fields: ['id'],
    }

    switch (true) {
        case id.startsWith('cat_'):
            baseParams.populate.subcategories = {
                populate: {
                    type_products: {
                        populate: {
                            products: {
                                fields: ['name', 'url', 'original_price', 'price'],
                                populate: { media: { fields: ['url', 'mime'] } }
                            }
                        }
                    }
                }
            }
            return ['categories', baseParams]

        case id.startsWith('subcat_'):
            baseParams.populate.type_products = {
                populate: {
                    products: {
                        fields: ['name', 'url', 'original_price', 'price'],
                        populate: { media: { fields: ['url', 'mime'] } }
                    }
                }
            }
            return ['subcategories', baseParams]

        case id.startsWith('type_'):
            baseParams.populate.products = {
                fields: ['name', 'url', 'original_price', 'price'],
                populate: { media: { fields: ['url', 'mime'] } }
            }
            return ['type-products', baseParams]

        default:
            return null
    }
}

const extractProducts = (data: any, id: string): any[] => {
    const item = data[0]
    if (!item) return []

    switch (true) {
        case id.startsWith('cat_'):
            return item.subcategories?.flatMap((sub: any) =>
                sub.type_products?.flatMap((type: any) => type.products || []) || []
            ) || []

        case id.startsWith('subcat_'):
            return item.type_products?.flatMap((type: any) => type.products || []) || []

        case id.startsWith('type_'):
            return item.products || []

        default:
            return []
    }
}

const formatProductCard = (product: any): Card => {
    return {
        id: product.id,
        name: product.name,
        images: product.media?.filter((item: any) => item.mime.startsWith('image/'))
            .map((image: any) => `${BACKEND_DOMAIN}${image.url}`) || [],
        price: product.price ? product.price : product.original_price,
        originalPrice: product.price ? product.original_price : null,
        url: product.url,
    }
}

export default defineEventHandler(async (event: H3Event): Promise<Card[]> => {
    const id = getRouterParam(event, 'id')
    if (!id) return []

    const queryData = buildQuery(id)
    if (!queryData) return []

    const [entity, queryParams] = queryData
    try {
        const { data } = await $fetch<any>(
            `${BACKEND_DOMAIN}/api/${entity}?${qs.stringify(queryParams, { encodeValuesOnly: true })}`
        )

        if (!data?.length) return []

        const products = extractProducts(data, id)
        return products.map(formatProductCard)
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
})
