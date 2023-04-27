import { createAction, props } from '@ngrx/store';

import { WorkExperience } from '@exxat/profile/models';
type GUID = string & { isGuid: true };

export const LoadWorkExperience = createAction(
  '[Load WorkExperience] Load WorkExperience',
  props<{ payload: string }>()
);

export const WorkExperienceLoaded = createAction(
  '[WorkExperience Loaded] WorkExperience Loaded',
  props<{ payload: WorkExperience[] }>()
);

export const UpdateWorkExperience = createAction(
  '[Update WorkExperience] Update WorkExperience',
  props<{ id: GUID, payload: any }>()
);

export const UpdateWorkExperienceSuccess = createAction(
  '[Update WorkExperience Success] Update WorkExperience Success',
  props<{ payload: any }>()
);

export const AddWorkExperience = createAction(
  '[Add WorkExperience] Add WorkExperience',
  props<{ payload: WorkExperience }>()
);

export const AddWorkExperienceSuccess = createAction(
  '[Add WorkExperience Success] Add WorkExperience Success',
  props<{ payload: WorkExperience }>()
);

export const DeleteWorkExperience = createAction(
  '[Delete WorkExperience] Delete WorkExperience',
  props<{ id: GUID }>()
);

export const DeleteWorkExperienceSuccess = createAction(
  '[Delete WorkExperience Success] Delete WorkExperience Success',
  props<{ payload: any }>()
);

export const WorkExperienceLoadError = createAction(
  '[WorkExperience Load Error] WorkExperience Load Error',
  props<{ payload: any }>()
);
