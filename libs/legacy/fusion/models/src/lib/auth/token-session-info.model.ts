export class TokenSessionInfo {
    constructor(
        public lastActivityTime: number,
        public tokenExpTime: number,
        public userName: string = '',
        public isAutoRenewCall: boolean = false
    ) {}
}
