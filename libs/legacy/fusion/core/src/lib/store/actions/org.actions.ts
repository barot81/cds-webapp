import { Action } from '@ngrx/store';
import { FacilityWiseStatuses, StatusCount } from '@zhealthcare/fusion/models';

export enum OrgActionTypes {

    SetFacilityWithStatuses = '[Auth] set FacilityWiseStatuses',
    GetFacilityWiseStatuses = '[Auth] get FacilityWiseStatuses',
    UpdateFacilityWiseStatuses = '[Auth] update FacilityWiseStatuses',
    LaunchSuccess = '[Auth] Launch Success',
    LaunchFailure = '[Auth] Launch Failure',
    SetFacilityName = '[Auth] SET FacilityName',
    SetStatusCount = '[Auth] SET StatusCount',
}


export class SetFacilityWithStatuses implements Action {
    readonly type = OrgActionTypes.SetFacilityWithStatuses;
    constructor(public payload: FacilityWiseStatuses) {
    }
}
export class UpdateFacilityWiseStatuses implements Action {
    readonly type = OrgActionTypes.UpdateFacilityWiseStatuses;
    constructor(public payload: FacilityWiseStatuses) {
    }
}

export class GetFacilityWiseStatuses implements Action {
    readonly type = OrgActionTypes.GetFacilityWiseStatuses;
}
export class LaunchSuccess implements Action {
    readonly type = OrgActionTypes.LaunchSuccess;
    constructor(public payload: FacilityWiseStatuses[]) {
    }
}
export class SetFacilityName implements Action {
    readonly type = OrgActionTypes.SetFacilityName;
    constructor(public payload: string) {
    }
}

export class LaunchFailure implements Action {
    readonly type = OrgActionTypes.LaunchFailure;
    constructor(public payload: any) {}
}

export class SetStatusCount implements Action {
    readonly type = OrgActionTypes.SetStatusCount;
    constructor(public payload: StatusCount[]) {}
}

export type OrgActions =
  | SetFacilityWithStatuses
  | UpdateFacilityWiseStatuses
  | GetFacilityWiseStatuses
  | LaunchSuccess
  | LaunchFailure
  | SetFacilityName
  | SetStatusCount;

