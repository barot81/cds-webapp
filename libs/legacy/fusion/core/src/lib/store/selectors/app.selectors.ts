import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.states';

export const getFusionAppState = createFeatureSelector<AppState>(
  'fusion'
);
export const getAppState = createSelector(
  getFusionAppState,
  (state: AppState) => state
);
