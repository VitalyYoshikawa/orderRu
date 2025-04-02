export interface CategoryLink {
    url: string,
    name: string
}

export interface CategoryListLink {
    title: string,
    items: CategoryLink[]
}

export interface Filter {
    type: 'price' | 'radio' | 'checkbox' | 'switch' | 'input'
    label?: string
    price?: {
        min: number,
        max: number,
    },
    values?: string,
    options?: {
        value: string | number;
        label: string
    }[]
    name?: string
    placeholder?: string
}
