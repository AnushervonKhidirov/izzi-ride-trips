type TCookieData = {
    [key: string]: string | number
}

export function addCookies(data: TCookieData) {
    for (let key in data) {
        document.cookie = `${key}=${data[key]}`
    }
}
