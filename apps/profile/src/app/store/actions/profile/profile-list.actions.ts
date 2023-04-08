import { ProfileList } from '@exxat/profile/models';
import { createAction, props } from '@ngrx/store';

export const LoadProfileList = createAction(
  '[Load ProfileList] Load ProfileList',
  props<{ payload: any }>()
);

export const ProfileListLoaded = createAction(
  '[ProfileList Loaded] ProfileList Loaded',
  props<{ payload: ProfileList }>()
);

export const ProfileListLoadError = createAction(
  '[ProfileList Load Error] ProfileList Load Error',
  props<{ payload: any }>()
);

export const PatchProfileList = createAction(
  '[Patch ProfileList] Patch ProfileList',
  props<{ payload: any }>()
);

export const DistroyProfileList = createAction(
  '[Distroy ProfileList] Distroy ProfileList'
);
