import { H3Event } from "h3"
import { BACKEND_DOMAIN } from "~/const/common"
import type { Card } from "~/interfaces/product"

interface QueryParamsResult {
    section: string
    params: string
}


const queryParams = (id: string, filter: string[] | Array<string>[]): QueryParamsResult => {
    let queryStr = ''
    if (filter.length) {
        filter.forEach((val, index) => {
            if (Array.isArray(val)) {
                val.forEach((val: string) => {
                    queryStr += `filters[$or][${index}][attribute_values][value][$eq]=${val}&`
                })
            } else {
                queryStr += `filters[$and][${index}][attribute_values][value][$eq]=${val}&`
            }
        })
    }

    let categoryFilter: string
    if (id.startsWith('cat_')) {
        categoryFilter = `filters[$and][${filter.length}][type_product][subcategory][category][url][$eq]=${id}`
    } else if (id.startsWith('subcat_')) {
        categoryFilter = `filters[$and][${filter.length}][type_product][subcategory][url][$eq]=${id}`
    } else if (id.startsWith('type_')) {
        categoryFilter = `filters[$and][${filter.length}][type_product][url][$eq]=${id}`
    } else {
        categoryFilter = `filters[type_product][subcategory][category][url][$eq]=${id}`
    }

    if (filter.length) {
        queryStr += categoryFilter
    } else {
        queryStr = categoryFilter
    }

    return {
        section: 'products',
        params: `?${queryStr}&populate[media][fields][0]=url`
    }
}

const formatProductCard = (product: any): Card => {
    return {
        id: product.id,
        name: product.name,
        images: product.media?.map((image: any) => `${BACKEND_DOMAIN}${image.url}`) || [],
        price: product.price ? product.price : product.original_price,
        originalPrice: product.price ? product.original_price : null,
        url: product.url,
    }
}

export default defineEventHandler(async (event: H3Event): Promise<Card[]> => {
    const id = getRouterParam(event, 'id')
    const filter: object = await readBody(event)

    let filterStr: string[] = []

    Object.values(filter).forEach((item) => {
        if (item.includes('%')) {
            filterStr.push(item.split('%'))
        } else {
            filterStr.push(item)
        }
    })


    if (!id) return []

    const { section, params } = queryParams(id, filterStr)

    try {
        const { data } = await $fetch<any>(
            `${BACKEND_DOMAIN}/api/${section}${params}`
        )

        if (!data?.length) return []

        const result = data.map((item: any) => formatProductCard(item))

        return result

    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
})
