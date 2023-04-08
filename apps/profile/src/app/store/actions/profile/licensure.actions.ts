import { createAction, props } from '@ngrx/store';

import { Licensure } from '@exxat/profile/models';
type GUID = string & { isGuid: true };

export const LoadLicensure = createAction(
  '[Load Licensure] Load Licensure',
  props<{ payload: string }>()
);

export const LicensureLoaded = createAction(
  '[Licensure Loaded] Licensure Loaded',
  props<{ payload: Licensure[] }>()
);

export const UpdateLicensure = createAction(
  '[Update Licensure] Update Licensure',
  props<{ id: GUID, payload: any }>()
);

export const UpdateLicensureSuccess = createAction(
  '[Update Licensure Success] Update Licensure Success',
  props<{ payload: any }>()
);

export const AddLicensure = createAction(
  '[Add Licensure] Add Licensure',
  props<{ payload: Licensure }>()
);

export const AddLicensureSuccess = createAction(
  '[Add Licensure Success] Add Licensure Success',
  props<{ payload: Licensure }>()
);

export const DeleteLicensure = createAction(
  '[Delete Licensure] Delete Licensure',
  props<{ id: GUID }>()
);

export const DeleteLicensureSuccess = createAction(
  '[Delete Licensure Success] Delete Licensure Success',
  props<{ payload: any }>()
);

export const LicensureLoadError = createAction(
  '[Licensure Load Error] Licensure Load Error',
  props<{ payload: any }>()
);
