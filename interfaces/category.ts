export interface CategoryLink {
    id: number
    documentId: string
    url: string
    name: string
}

export interface CategoryListLink {
    id: number
    documentId: string
    name: string,
    url: string,
    subcategories: CategoryLink[]
}

export interface QueryParams {
    filters: { url: { $eq: string } }
    populate: Record<string, any>
    fields: string[]
}

export interface AttributeData {
    type: 'price' | 'radio' | 'checkbox' | 'switch' | 'input'
    name: string
    attribute_values: Array<{
        value: string
        name: string
    }>
}

export interface Filter {
    type: 'price' | 'radio' | 'checkbox' | 'switch' | 'input'
    label?: string
    price?: {
        min: number
        max: number
    },
    values?: string
    options?: {
        value: string | number
        label: string
    }[]
    name?: string
    placeholder?: string
}
