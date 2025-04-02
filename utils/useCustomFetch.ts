import type { UseFetchOptions } from "#app"

export default async <T>(
    url: string,
    options: UseFetchOptions<T> = {},
    requestPage?: boolean
): Promise<T | null> => {
    const { data, error } = await useFetch<T>(url, options as object )

    if (error.value) {
        console.error(error.value.message);
        if (requestPage) {
            throw createError({
                statusMessage: error.value.message,
                statusCode: error.value.statusCode,
            });
        }
        return null;
    }

    return data.value as T
}
