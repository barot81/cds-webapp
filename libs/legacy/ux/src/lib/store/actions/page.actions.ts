import { createAction, props } from '@ngrx/store';

export const setPageTitle = createAction(
  '[set page Title] set page Title',
  props<{ pageTitle: string }>()
);

export const setPageTitleWithNavigationId = createAction(
  '[set page Title with Navigation Id] set page Title and navigationId',
  props<{ pageTitle: string, navigationId :string }>()
);

export const ClearPageState = createAction(
  '[Clear Page State] Clear Page State'
);
