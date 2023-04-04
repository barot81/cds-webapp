import { TenantWithOuCodeTree } from './tenantWithOucodeTree';
export class LaunchDataModel {
  constructor(
    public tenentWithOucodeAccessTrees: any[],
    public roleHash: string,
    public navigationHash: string
  ) {}
}
