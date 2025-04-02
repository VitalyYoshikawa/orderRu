import type {CategoryLink} from "~/interfaces/category"

export default defineEventHandler((event) => {
    const data: CategoryLink[] = [
        {
            url: '/category/elektronika',
            name: 'Куртки'
        },
        {
            url: '/category/krossovki',
            name: 'Кроссовки'
        },
        {
            url: '/category/telefon',
            name: 'Телефон'
        }
    ]
    return data
})
