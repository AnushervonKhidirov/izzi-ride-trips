export enum Endpoint {
    LogIn = 'https://dummyjson.com/auth/login',
    User = 'https://dummyjson.com/auth/me',
    RefreshToken = 'https://dummyjson.com/auth/refresh',
    Cars = 'https://dummyjson.com/c/2f15-f1ff-4ac9-8f02',
}

export enum Token {
    AccessKey = 'accessToken',
    RefreshKey = 'refreshToken',
    ExpiredText = 'Unauthorized',
    ExpiredCode = '401',
}
