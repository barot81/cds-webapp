import { createAction, props } from '@ngrx/store';
type GUID = string & { isGuid: true };
import { Education } from '@exxat/profile/models';

export const LoadEducation = createAction(
  '[Load Education] Load Education',
  props<{ payload: string}>()
);

export const EducationLoaded = createAction(
  '[Education Loaded] Education Loaded',
  props<{ payload: Education[] }>()
);

export const UpdateEducation = createAction(
  '[Update Education] Update Education',
  props<{ id: GUID, payload: any }>()
);

export const UpdateEducationSuccess = createAction(
  '[Update Education Success] Update Education Success',
  props<{ payload: any }>()
);

export const AddEducation = createAction(
  '[Add Education] Add Education',
  props<{ payload: Education }>()
);

export const AddEducationSuccess = createAction(
  '[Add Education Success] Add Education Success',
  props<{ payload: Education }>()
);

export const DeleteEducation = createAction(
  '[Delete Education] Delete Education',
  props<{ id: GUID }>()
);

export const DeleteEducationSuccess = createAction(
  '[Delete Education Success] Delete Education Success',
  props<{ payload: any }>()
);

export const EducationLoadError = createAction(
  '[Education Load Error] Education Load Error',
  props<{ payload: any }>()
);
