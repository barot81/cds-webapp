export class TokenSessionInfo {
    constructor(
        public lastActivityTime: number,
        public tokenExpTime: number,
        public userName: string = '',
        public isAutoRenewCall?: any
    ) {
 
        // use case 1:
        // auto renew
        // expiry - 2 ->  
        // expiry == currenttime + 2
        // if(!tokenExp) {
        //     tokenExp = tokenIat + (expirationDuration *60);
        // }
 
        // if(!sysExp) {
        //     sysExp = sysIat + (expirationDuration *60);
        // }
    }
}