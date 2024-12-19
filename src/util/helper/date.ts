export function getTime(date: Date): string {
    return `${date.toLocaleTimeString().split(':').slice(0, 2).join(':')} ${date.toLocaleTimeString().split(' ').at(-1)}`
}

export function getDay(date: Date): string {
    return date.toDateString().split(' ').slice(1).join(' ')
}
