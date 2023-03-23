export class TokenModel {
    accessToken: string;
    refreshToken: string;
    expiration: string;
}

export enum LoginType {
    REDIRECT,
    POPUP
}
