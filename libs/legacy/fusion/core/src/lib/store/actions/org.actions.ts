import { Action } from '@ngrx/store';
import { OuCodeAccessTree, TenantWithOuCodeTree } from '@exxat/fusion/models';

export enum OrgActionTypes {

    SetTenantWithOucodes = '[Auth] set TenantWithOuCodeTree',
    GetTenantWithOucodes = '[Auth] get TenantWithOuCodeTree',
    UpdateTenantWithOucodes = '[Auth] update TenantWithOuCodeTree',
    LaunchSuccess = '[Auth] Launch Success',
    LaunchFailure = '[Auth] Launch Failure',
    SetTenantName = '[Auth] SET TenantName',
    SetOuCodeAccessTree = '[Auth] SET OuCodeAccessTree',
}


export class SetTenantWithOucodes implements Action {
    readonly type = OrgActionTypes.SetTenantWithOucodes;
    constructor(public payload: TenantWithOuCodeTree) {
    }
}
export class UpdateTenantWithOucodes implements Action {
    readonly type = OrgActionTypes.UpdateTenantWithOucodes;
    constructor(public payload: TenantWithOuCodeTree) {
    }
}

export class GetTenantWithOucodes implements Action {
    readonly type = OrgActionTypes.GetTenantWithOucodes;
}
export class LaunchSuccess implements Action {
    readonly type = OrgActionTypes.LaunchSuccess;
    constructor(public payload: TenantWithOuCodeTree[]) {
    }
}
export class SetTenantName implements Action {
    readonly type = OrgActionTypes.SetTenantName;
    constructor(public payload: string) {
    }
}

export class LaunchFailure implements Action {
    readonly type = OrgActionTypes.LaunchFailure;
    constructor(public payload: any) {}
}

export class SetOuCodeAccessTree implements Action {
    readonly type = OrgActionTypes.SetOuCodeAccessTree;
    constructor(public payload: OuCodeAccessTree[]) {}
}

export type OrgActions =
  | SetTenantWithOucodes
  | UpdateTenantWithOucodes
  | GetTenantWithOucodes
  | LaunchSuccess
  | LaunchFailure
  | SetTenantName
  | SetOuCodeAccessTree;

