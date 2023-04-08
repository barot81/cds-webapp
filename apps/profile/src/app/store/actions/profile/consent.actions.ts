import { Consent } from '@exxat/profile/models';
import { createAction, props } from '@ngrx/store';
type GUID = string & { isGuid: true };

export const LoadConsent = createAction(
  '[Load Consent] Load Consent'
); 

export const ConsentLoaded = createAction(
  '[Consent Loaded] Consent Loaded',
  props<{ payload: Consent[] }>()
);

export const UpdateConsent = createAction(
  '[Update Consent] Update Consent',
  props<{ id: GUID, payload: any }>()
);

export const UpdateConsentSuccess = createAction(
  '[Update Consent Success] Update Consent Success',
  props<{ payload: any }>()
);

export const AddConsent = createAction(
  '[Add Consent] Add Consent',
  props<{ payload: Consent }>()
);

export const AddConsentSuccess = createAction(
  '[Add Consent Success] Add Consent Success',
  props<{ payload: Consent }>()
);

export const DeleteConsent = createAction(
  '[Delete Consent] Delete Consent',
  props<{ id: GUID }>()
);

export const DeleteConsentSuccess = createAction(
  '[Delete Consent Success] Delete Consent Success',
  props<{ payload: any }>()
);

export const ConsentLoadError = createAction(
  '[Consent Load Error] Consent Load Error',
  props<{ payload: any }>()
);

