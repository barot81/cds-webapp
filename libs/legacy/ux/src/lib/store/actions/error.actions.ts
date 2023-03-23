import { createAction, props } from '@ngrx/store';

export const AddError = createAction(
  '[Add Error] Add Error',
  props<{ source: string, payload: any }>()
);

export const ClearError = createAction(
  '[Clear Error] Clear Error',
  props<{ payload: string }>()
);
