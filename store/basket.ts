export default defineStore('basket', () => {
    interface BasketItem {
        id: string,
        count: number,
    }

    const basket = useCookie<BasketItem[]>('basket', { default: () => [] }) // позже сделать идентификатор по токену

    const count = basket.value.reduce((acc, item) => {
        return acc + item.count
    }, 0)

    const counterAddProduct = ref<number>(count)

    const handleCounterMinus = () => {
        counterAddProduct.value--
    }

    const handleCounterPlus = () => {
        counterAddProduct.value++
    }

    const findObjectIndex = (value: string): number => {
        return basket.value.findIndex(item => item.id === value)
    }

    const findObject = (value: string | undefined): BasketItem | undefined => {
        if (!value) return

        return basket.value.find((item) => {
            return item.id === value
        })
    }

    const addToBasket = (product: BasketItem) => {
        const index = findObjectIndex(product.id)
       if (index === -1) {
           basket.value.push(product)
       } else {
           basket.value[index].count = product.count
       }
    }

    const removeFromBasket = (product: BasketItem) => {
        const index = findObjectIndex(product.id)
        if (index !== -1 && product.count !== 0) {
            basket.value[index].count = product.count
        } else {
            basket.value = basket.value.filter(item => item.id !== product.id)
        }
    }

    return {basket, counterAddProduct, handleCounterMinus, handleCounterPlus, addToBasket, removeFromBasket, findObject}
})
