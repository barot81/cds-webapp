import { createAction, props } from '@ngrx/store';

import { Profile } from '@exxat/profile/models';
type GUID = string & { isGuid: true };

export const LoadPersonalInformation = createAction(
  '[Load PersonalInformation] Load PersonalInformation',
  props<{ payload: string}>()
);

export const PersonalInformationLoaded = createAction(
  '[PersonalInformation Loaded] PersonalInformation Loaded',
  props<{ payload: Profile}>()
);

export const UpdatePersonalInformation = createAction(
  '[Update PersonalInformation] Update PersonalInformation',
  props<{ id: GUID, payload: any }>()
);

export const PatchPersonalInformation = createAction(
  '[Patch PersonalInformation] Patch PersonalInformation',
  props<{ id: GUID, payload: any }>()
);

export const UpdatePersonalInformationSuccess = createAction(
  '[Update PersonalInformation Success] Update PersonalInformation Success',
  props<{ payload: any }>()
);

export const AddPersonalInformation = createAction(
  '[Add PersonalInformation] Add PersonalInformation',
  props<{ payload: Profile }>()
);

export const AddPersonalInformationSuccess = createAction(
  '[Add PersonalInformation Success] Add PersonalInformation Success',
  props<{ payload: Profile }>()
);

export const PersonalInformationLoadError = createAction(
  '[PersonalInformation Load Error] PersonalInformation Load Error',
  props<{ payload: any }>()
);
