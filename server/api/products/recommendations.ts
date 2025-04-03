import type {Card} from "~/interfaces/product";

export default defineEventHandler((event) => {
    const data: Card[] = [
        {
            id: '1',
            name: 'Видеорегистратор автомобильные 3 в 1, регистратор с камерой переднего и заднего вида',
            images: [
                "/_nuxt/assets/image/7364513132.webp",
                "/_nuxt/assets/image/46921_01.jpg",
                "/_nuxt/assets/image/foni-papik-pro-b3vd-p-kartinki-tsifra-19-na-prozrachnom-fone-1.png",
                "/_nuxt/assets/image/trafaret-papik-pro-5rnz-p-trafareti-tsifra-odin-tsvetnaya-1.jpg",
            ],
            price: 3900,
            originalPrice: 8200,
            url: '1',
            rating: 4.5,
            commentCount: 123,
            favorite: false
        }
    ]
    return data
})
