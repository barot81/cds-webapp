import { createAction, props } from '@ngrx/store';

import { Membership } from '@exxat/profile/models';
type GUID = string & { isGuid: true };

export const LoadMembership = createAction(
  '[Load Membership] Load Membership',
  props<{ payload: string }>()
);

export const MembershipLoaded = createAction(
  '[Membership Loaded] Membership Loaded',
  props<{ payload: Membership[] }>()
);

export const UpdateMembership = createAction(
  '[Update Membership] Update Membership',
  props<{ id: GUID, payload: any }>()
);

export const UpdateMembershipSuccess = createAction(
  '[Update Membership Success] Update Membership Success',
  props<{ payload: any }>()
);

export const AddMembership = createAction(
  '[Add Membership] Add Membership',
  props<{ payload: Membership }>()
);

export const AddMembershipSuccess = createAction(
  '[Add Membership Success] Add Membership Success',
  props<{ payload: Membership }>()
);

export const DeleteMembership = createAction(
  '[Delete Membership] Delete Membership',
  props<{ id: GUID }>()
);

export const DeleteMembershipSuccess = createAction(
  '[Delete Membership Success] Delete Membership Success',
  props<{ payload: any }>()
);

export const MembershipLoadError = createAction(
  '[Membership Load Error] Membership Load Error',
  props<{ payload: any }>()
);
