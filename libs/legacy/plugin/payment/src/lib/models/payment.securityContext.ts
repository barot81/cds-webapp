import { ITenantEntity, IOwningUserEntity, IOwningOrganizationUnitEntity, SecurityContext } from '@exxat/fusion/models';

export class PaymentSecurityContext extends SecurityContext implements ITenantEntity, IOwningUserEntity, IOwningOrganizationUnitEntity {
    constructor(public tenantId: string, public owningUser: string, public owningOrganizationUnit: string) {
        super();
    }
}