import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from '../reducers/uistate.reducers';

export const getUIState = createFeatureSelector<UIState>(
  'ui'
);

export const getAppState = createSelector(
  getUIState,
  (state: UIState) => state
);
