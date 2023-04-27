import { createAction, props } from '@ngrx/store';

import { RelatedExperience } from '@exxat/profile/models';
type GUID = string & { isGuid: true };

export const LoadRelatedExperience = createAction(
  '[Load RelatedExperience] Load RelatedExperience',
  props<{ payload: string }>()
);

export const RelatedExperienceLoaded = createAction(
  '[RelatedExperience Loaded] RelatedExperience Loaded',
  props<{ payload: RelatedExperience[] }>()
);

export const UpdateRelatedExperience = createAction(
  '[Update RelatedExperience] Update RelatedExperience',
  props<{ id: GUID, payload: any }>()
);

export const UpdateRelatedExperienceSuccess = createAction(
  '[Update RelatedExperience Success] Update RelatedExperience Success',
  props<{ payload: any }>()
);

export const AddRelatedExperience = createAction(
  '[Add RelatedExperience] Add RelatedExperience',
  props<{ payload: RelatedExperience }>()
);

export const AddRelatedExperienceSuccess = createAction(
  '[Add RelatedExperience Success] Add RelatedExperience Success',
  props<{ payload: RelatedExperience }>()
);

export const DeleteRelatedExperience = createAction(
  '[Delete RelatedExperience] Delete RelatedExperience',
  props<{ id: GUID }>()
);

export const DeleteRelatedExperienceSuccess = createAction(
  '[Delete RelatedExperience Success] Delete RelatedExperience Success',
  props<{ payload: any }>()
);

export const RelatedExperienceLoadError = createAction(
  '[RelatedExperience Load Error] RelatedExperience Load Error',
  props<{ payload: any }>()
);
