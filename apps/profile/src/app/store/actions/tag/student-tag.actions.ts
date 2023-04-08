import { createAction, props } from '@ngrx/store';

import { StudentTag } from '@exxat/profile/models';
type GUID = string & { isGuid: true };

export const LoadStudentTag = createAction(
  '[Load StudentTag] Load StudentTag',
  props<{ payload: string}>()
);

export const StudentTagLoaded = createAction(
  '[StudentTag Loaded] StudentTag Loaded',
  props<{ payload: StudentTag[] }>()
);

export const UpdateStudentTag = createAction(
  '[Update StudentTag] Update StudentTag',
  props<{ id: GUID, payload: any }>()
);

export const UpdateStudentTagSuccess = createAction(
  '[Update StudentTag Success] Update StudentTag Success',
  props<{ payload: any }>()
);

export const UpdateRangeStudentTag = createAction(
  '[UpdateRange StudentTag] UpdateRange StudentTag',
  props<{ payload: StudentTag[] }>()
);

export const UpdateRangeStudentTagSuccess = createAction(
  '[UpdateRange StudentTag Success] UpdateRange StudentTag Success',
  props<{ payload: StudentTag[] }>()
);

export const AddStudentTag = createAction(
  '[Add StudentTag] Add StudentTag',
  props<{ payload: StudentTag }>()
);

export const AddStudentTagSuccess = createAction(
  '[Add StudentTag Success] Add StudentTag Success',
  props<{ payload: StudentTag }>()
);

export const DeleteStudentTag = createAction(
  '[Delete StudentTag] Delete StudentTag',
  props<{ id: GUID }>()
);

export const DeleteRangeStudentTag = createAction(
  '[DeleteRange StudentTag] DeleteRange StudentTag',
  props<{ id: GUID }>()
);

export const DeleteRangeStudentTagSuccess = createAction(
  '[DeleteRange StudentTag Success] DeleteRange StudentTag Success',
  props<{ payload: any }>()
);

export const DeleteStudentTagSuccess = createAction(
  '[Delete StudentTag Success] Delete StudentTag Success',
  props<{ payload: any }>()
);

export const StudentTagLoadError = createAction(
  '[StudentTag Load Error] StudentTag Load Error',
  props<{ payload: any }>()
);
