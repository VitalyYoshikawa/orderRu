export interface Card {
    id: string,
    name: string,
    images: string[],
    price: number,
    originalPrice: number,
    url: string,
    rating?: number,
    commentCount?: number,
    count?: number,
}

export interface Attribute {
    name: string
}

export interface AttributeValue {
    name: string
    value: string
    attribute: Attribute
}

export interface Media {
    id: number
    documentId: string
    url: string
    mimeType: string
}

export interface Product {
    documentId: string
    name: string
    url: string
    description: string
    count: number
    original_price: number
    price: number
    media: string[]
    attribute_values: AttributeValue[],
}
