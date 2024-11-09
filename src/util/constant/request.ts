export enum Endpoint {
    LogIn = 'https://dummyjson.com/auth/login',
    User = 'https://dummyjson.com/auth/me',
    RefreshToken = 'https://dummyjson.com/auth/refresh',
}

export enum Token {
    AccessKey = 'accessToken',
    RefreshKey = 'refreshToken',
    ExpiredText = 'Unauthorized',
    ExpiredCode = '401',
}
