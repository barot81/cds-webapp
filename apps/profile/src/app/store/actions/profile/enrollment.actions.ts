import { createAction, props } from '@ngrx/store';

import { Enrollment } from '@exxat/profile/models';
type GUID = string & { isGuid: true };

export const LoadEnrollment = createAction(
  '[Load Enrollment] Load Enrollment',
  props<{ payload: string}>()
);

export const EnrollmentLoaded = createAction(
  '[Enrollment Loaded] Enrollment Loaded',
  props<{ payload: Enrollment }>()
);

export const UpdateEnrollment = createAction(
  '[Update Enrollment] Update Enrollment',
  props<{ id: GUID, payload: any }>()
);

export const UpdateStudentNumber = createAction(
  '[Update Student Number] Update Student Number',
  props<{ id: GUID, payload: any }>()
);

export const PatchEnrollment = createAction(
  '[Update Enrollment Values] Update Enrollment Values',
  props<{ payload: Enrollment[] }>()
);

export const UpdateEnrollmentSuccess = createAction(
  '[Update Enrollment Success] Update Enrollment Success',
  props<{ payload: any }>()
);

export const AddEnrollment = createAction(
  '[Add Enrollment] Add Enrollment',
  props<{ payload: Enrollment }>()
);

export const AddEnrollmentSuccess = createAction(
  '[Add Enrollment Success] Add Enrollment Success',
  props<{ payload: Enrollment }>()
);

export const DeleteEnrollment = createAction(
  '[Delete Enrollment] Delete Enrollment',
  props<{ id: GUID }>()
);

export const DeleteEnrollmentSuccess = createAction(
  '[Delete Enrollment Success] Delete Enrollment Success',
  props<{ payload: any }>()
);

export const EnrollmentLoadError = createAction(
  '[Enrollment Load Error] Enrollment Load Error',
  props<{ payload: any }>()
);
