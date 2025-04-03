import type { Seo } from '~/interfaces/seo'

export default async (): Promise<Seo | null> => {
    const router = useRouter()
    const pathName = router.currentRoute.value.name
    const pathId = router.currentRoute.value.params.id

    return await useCustomFetch(`/api/seo`, {
        method: "POST",
        body: {
            pathName,
            pathId
        }
    })

}
