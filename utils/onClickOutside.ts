import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export default <T extends HTMLElement> (elementRef: Ref<T | null>, fn: Function):void  => {

    const handleClickOutside = (event: MouseEvent) => {
        if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
            fn()
        }
    }

    onMounted(() => {
        document.addEventListener('mousedown', handleClickOutside)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('mousedown', handleClickOutside)
    })

}
