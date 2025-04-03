export interface Breadcrumb {
    name: string
    url: string
}

export interface Seo {
    title: string
    breadcrumbs: Breadcrumb[]
}
