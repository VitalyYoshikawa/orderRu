import {H3Event} from "h3"
import {BACKEND_DOMAIN} from "~/const/common"
import qs from "qs"
import {Card} from "~/interfaces/product"



export default defineEventHandler(async (event: H3Event): Promise<Card[] | null> => {
    const filter = await readBody(event)

    if (!filter?.ids) return []

    const query = qs.stringify(
        {
            filters: {
                documentId: {
                    $in: filter.ids,
                },
            },
            populate: {
                media: {
                    fields: ['url']
                }
            }
        },
        {
            encodeValuesOnly: true,
        }
    )


    const { data } = await $fetch<{ data: Card[] }>(
        `${BACKEND_DOMAIN}/api/products?${query}`
    )

    if (!data?.length) return []

    const formatProductCard = (product: any): Card => {
        return {
            id: product.documentId,
            name: product.name,
            images: product.media?.map((image: any) => `${BACKEND_DOMAIN}${image.url}`) || [],
            price: product.price ? product.price : product.original_price,
            originalPrice: product.price ? product.original_price : null,
            url: product.url,
        }
    }

    return data?.map((item: any) => formatProductCard(item)) || []
})
