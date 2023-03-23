export class MetaRoleModel {
    access:Access[];
    id: string;
    isActive: boolean;
    tenantId: string;
    ouCode: string;
    constructor() {
    }
  }
  
export interface Access {
    microserviceCode: string;
    features: Feature[];
}

export interface Feature {

    featureCode: string;
    permissions: [];
}
