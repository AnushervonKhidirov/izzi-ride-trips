export function linkGenerator(pathname: string, params: { [key: string]: string | number }): string {
    const paramsArr = []

    for (const param in params) {
        paramsArr.push(`${param}=${encodeURIComponent(params[param])}`)
    }

    return `${pathname}?${paramsArr.join('&')}`
}
