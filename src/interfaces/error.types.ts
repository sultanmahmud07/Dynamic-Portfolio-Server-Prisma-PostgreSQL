export interface TErrorSources {
    path: string;
    message: string
}
export interface ILogin {
    email: string;
    password: string
}
export interface TGenericErrorResponse {
    statusCode: number,
    message: string,
    errorSources?: TErrorSources[]

}