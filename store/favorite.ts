export default defineStore('favorite', () => {
    const favorites = useCookie<string[]>('favorites', { default: () => [] })  // позже сделать идентификатор по токену

    const counterAddFavorite = ref<number>(favorites.value ? favorites?.value?.length : 0)

    const handleCounterMinus = () => {
        counterAddFavorite.value--
    }

    const handleCounterPlus = () => {
        counterAddFavorite.value++
    }

    const addToFavorites = (productId: string) => {
        if (!favorites.value.includes(productId)) {
            favorites.value.push(productId)
        }
    }

    const removeFromFavorites = (productId: string) => {
        favorites.value = favorites.value.filter(id => id !== productId)
    }

    return {counterAddFavorite, favorites, handleCounterMinus, handleCounterPlus, addToFavorites, removeFromFavorites }
})
