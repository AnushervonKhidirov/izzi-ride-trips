const endpoint = 'http://194.135.105.117:9091/api/v1'

export enum Endpoint {
    LogIn = `${endpoint}/sign`,
    UserInfo = `${endpoint}/user/info`,
    Roles = `${endpoint}/user/roles`,
    RefreshToken = `${endpoint}/refresh-token`,
    AddCar = `${endpoint}/user/car`,
    Car = `${endpoint}/`,
    Cars = `${endpoint}/user/cars`,
    CarManufacturers = `${endpoint}/car/manufacturers`,
    CarModels = `${endpoint}/car/models`,
    CarManufacturerModels = `${endpoint}/car/models?manufacturer_id=[id]`,
    Trip = `${endpoint}/`,
    Trips = `${endpoint}/`,
}

export enum Token {
    Access = 'access_token',
    Refresh = 'refresh_token',
    ExpiredText = 'Unauthorized',
    ExpiredCode = '401',
}
