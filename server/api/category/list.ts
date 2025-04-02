import type {CategoryListLink} from "~/interfaces/category"

export default defineEventHandler((event) => {
    const data: CategoryListLink[] = [
        {
            title: 'Куртки',
            items: [
                {
                    url: '/category/zimnyay',
                    name: 'Зимняя'
                }
            ]
        }
    ]
    return data
})
