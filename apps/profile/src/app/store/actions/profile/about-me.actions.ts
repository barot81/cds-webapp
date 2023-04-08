import { createAction, props } from '@ngrx/store';

import { AboutMe } from '@exxat/profile/models';

type GUID = string & { isGuid: true };

export const GetAboutMe = createAction(
  '[Get AboutMe] Get AboutMe',
  props<{ id: string }>()
);

export const LoadAboutMe = createAction(
  '[Load AboutMe] Load AboutMe',
  props<{ payload: string }>()
);

export const AboutMeLoaded = createAction(
  '[AboutMe Loaded] AboutMe Loaded',
  props<{ payload: AboutMe }>()
);

export const UpdateAboutMe = createAction(
  '[Update AboutMe] Update AboutMe',
  props<{ id: GUID, payload: any }>()
);

export const UpdateAboutMeSuccess = createAction(
  '[Update AboutMe Success] Update AboutMe Success',
  props<{ payload: any }>()
);

export const UpdateResumeKey = createAction(
  '[Update ResumeKey] Update ResumeKey',
  props<{ id: GUID, payload: any }>()
);

export const UpdateResumeKeySuccess = createAction(
  '[Update ResumeKey Success] Update ResumeKey Success',
  props<{ payload: any }>()
);

export const AddAboutMe = createAction(
  '[Add AboutMe] Add AboutMe',
  props<{ payload: AboutMe }>()
);

export const AddAboutMeSuccess = createAction(
  '[Add AboutMe Success] Add AboutMe Success',
  props<{ payload: AboutMe }>()
);

export const AboutMeLoadError = createAction(
  '[AboutMe Load Error] AboutMe Load Error',
  props<{ payload: any }>()
);
