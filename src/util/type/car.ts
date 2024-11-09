export type TCar = Readonly<{
    id: string
    brand: string
    model: string | undefined
    image: string | undefined
    properties: {
        [key: string]: string | number
    }
}>
