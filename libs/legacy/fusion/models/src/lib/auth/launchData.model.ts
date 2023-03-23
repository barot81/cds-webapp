import { TenantWithOuCodeTree } from './tenantWithOucodeTree';
export class LaunchDataModel {
  constructor(
    public tenentWithOucodeAccessTrees: TenantWithOuCodeTree[],
    public roleHash: string,
    public navigationHash: string
  ) {}
}
