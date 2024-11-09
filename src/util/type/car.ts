// export type TCar = {
//     id: string
//     brand: string
//     model: string | undefined
//     type: string
//     seats: number
//     year: number
//     plate: string
//     image: string | undefined
// }

export type TCar = {
    id: string
    brand: string
    model: string | undefined
    image: string | undefined
    properties: {
        [key: string]: string | number
    }
}
