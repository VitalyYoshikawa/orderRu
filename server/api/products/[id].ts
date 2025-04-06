import {H3Event} from "h3"
import {BACKEND_DOMAIN} from "~/const/common"
import qs from "qs"
import {AttributeValue, Product} from "~/interfaces/product"



export default defineEventHandler(async (event: H3Event): Promise<Product | null> => {
    const id = getRouterParam(event, "id")

    const query = qs.stringify(
        {
            filters: {
                url: {
                    $eq: id,
                },
            },
            populate: {
                attribute_values: {
                    populate: {
                        attribute: {
                            fields: ["name"],
                        },
                    },
                    fields: ["name"],
                },
                media: {
                    fields: ['url', 'mime'],
                }
            },
            fields: [
                "documentId",
                "name",
                "url",
                "description",
                "count",
                "original_price",
                "price",
            ],
        },
        {
            encodeValuesOnly: true,
        }
    )


    const { data } = await $fetch<{ data: Product[] }>(
        `${BACKEND_DOMAIN}/api/products?${query}`
    )

    if (!data?.length) return null

    const groupedAttributes = data[0].attribute_values.map((attr): AttributeValue => ({
        name: attr.attribute.name,
        value: attr.name,
        attribute: attr.attribute,
    }))

    const urls: string[] = data[0].media.map((item: any) => BACKEND_DOMAIN + item.url)

    return {...data[0], attribute_values: groupedAttributes, media: urls}
})
