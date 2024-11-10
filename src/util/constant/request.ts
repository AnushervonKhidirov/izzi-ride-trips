export enum Endpoint {
    LogIn = 'https://dummyjson.com/auth/login',
    User = 'https://dummyjson.com/auth/me',
    RefreshToken = 'https://dummyjson.com/auth/refresh',
    Car = 'https://dummyjson.com/c/25ae-0d7a-45af-b8c6',
    Cars = 'https://dummyjson.com/c/2c8c-87ea-4726-a784',
    Trip = 'https://dummyjson.com/c/d1d2-0b71-4f9c-9fad',
    Trips = 'https://dummyjson.com/c/783b-3927-4b48-9add',
}

export enum Token {
    AccessKey = 'accessToken',
    RefreshKey = 'refreshToken',
    ExpiredText = 'Unauthorized',
    ExpiredCode = '401',
}
