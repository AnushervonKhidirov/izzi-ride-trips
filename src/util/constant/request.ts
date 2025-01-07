const endpoint = 'http://194.135.105.117:9091/api/v1'

export enum Endpoint {
    LogIn = `${endpoint}/sign`,
    UserInfo = `${endpoint}/user/info`,
    Roles = `${endpoint}/user/roles`,
    RefreshToken = `${endpoint}/refresh-token`,
    AddCar = `${endpoint}/user/car`,
    Car = `${endpoint}/`,
    Cars = `${endpoint}/user/cars`,
    Trip = `${endpoint}/`,
    Trips = `${endpoint}/`,
}

export enum Token {
    Access = 'access_token',
    Refresh = 'refresh_token',
    ExpiredText = 'cannot parse token',
    ExpiredCode = '68',
}
