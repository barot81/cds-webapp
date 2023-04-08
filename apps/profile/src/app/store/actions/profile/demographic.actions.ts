import { createAction, props } from '@ngrx/store';

import { Demographic } from '@exxat/profile/models';
type GUID = string & { isGuid: true };

export const LoadDemographic = createAction(
  '[Load Demographic] Load Demographic',
  props<{ payload: string }>()
);

export const DemographicLoaded = createAction(
  '[Demographic Loaded] Demographic Loaded',
  props<{ payload: Demographic }>()
);

export const UpdateDemographic = createAction(
  '[Update Demographic] Update Demographic',
  props<{ id: GUID, payload: any }>()
);

export const UpdateDemographicSuccess = createAction(
  '[Update Demographic Success] Update Demographic Success',
  props<{ payload: any }>()
);

export const AddDemographic = createAction(
  '[Add Demographic] Add Demographic',
  props<{ payload: Demographic }>()
);

export const AddDemographicSuccess = createAction(
  '[Add Demographic Success] Add Demographic Success',
  props<{ payload: Demographic }>()
);

export const DemographicLoadError = createAction(
  '[Demographic Load Error] Demographic Load Error',
  props<{ payload: any }>()
);
