import type {Card} from "~/interfaces/product"
import {H3Event} from "h3";
import qs from "qs";
import {BACKEND_DOMAIN} from "~/const/common"

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
                subcategories: {
                    fields: ['documentId'],
                    populate: {
                        type_products: {
                            fields: ['documentId'],
                            populate: {
                                products: {
                                    fields: [
                                        'name',
                                        'url',
                                        'original_price',
                                        'price',],
                                    populate: {
                                        media: {
                                            fields: ['url', 'mime'],
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            },
            fields: ['documentId'],
            limit: -1
        },
        {
            encodeValuesOnly: true,
        }
    )

    const {data} = await $fetch<any>(`${BACKEND_DOMAIN}/api/categories?${query}`)

    const allProducts: Card[] = data.flatMap((category: any) =>
        category.subcategories.flatMap((subcategory: any) =>
            subcategory.type_products.flatMap((typeProduct: any) =>
                typeProduct.products.flatMap((product: any) => {
                        return {
                            id: product.id,
                            name: product.name,
                            images: product.media.filter((item: any) => item.mime.startsWith('image/')).map((image: any) => (BACKEND_DOMAIN + image.url)),
                            price: product.price ? product.price : product.original_price,
                            originalPrice: product.price ? product.original_price : null,
                            url: product.url,
                        }
                    }
                ) || []
            ) || []
        ) || []
    ) || []

    return allProducts
})
