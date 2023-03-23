export class OuCode {

    constructor(
        public key: string,
        public value: string,
        public isSelected?: boolean) {
    }
}
export class TenantWithOuCodes {

    constructor(
        public TenantId: string,
        public Oucodes: OuCode[]) {
    }
}
