import { createAction, props } from '@ngrx/store';

import { TagMaster } from '@exxat/profile/models';
type GUID = string & { isGuid: true };

export const LoadStudentTagMaster = createAction(
  '[Load Student TagMaster] Load Student TagMaster',
);

export const StudentTagMasterLoaded = createAction(
  '[Student TagMaster Loaded] Student TagMaster Loaded',
  props<{ payload: TagMaster[] }>()
);

export const UpdateStudentTagMaster = createAction(
  '[Update Student TagMaster] Update Student TagMaster',
  props<{ id: GUID, payload: any }>()
);

export const UpdateStudentTagMasterSuccess = createAction(
  '[Update Student TagMaster Success] Update Student TagMaster Success',
  props<{ payload: any }>()
);

export const AddStudentTagMaster = createAction(
  '[Add Student TagMaster] Add Student TagMaster',
  props<{ payload: TagMaster }>()
);

export const AddStudentTagMasterSuccess = createAction(
  '[Add Student TagMaster Success] Add Student TagMaster Success',
  props<{ payload: TagMaster }>()
);

export const DeleteStudentTagMaster = createAction(
  '[Delete Student TagMaster] Delete Student TagMaster',
  props<{ id: GUID }>()
);

export const DeleteStudentTagMasterSuccess = createAction(
  '[Delete Student TagMaster Success] Delete Student TagMaster Success',
  props<{ payload: any }>()
);

export const StudentTagMasterLoadError = createAction(
  '[TagMaster Student Load Error] TagMaster Student Load Error',
  props<{ payload: any }>()
);
