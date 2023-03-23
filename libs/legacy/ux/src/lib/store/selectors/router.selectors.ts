import { createSelector } from '@ngrx/store';
import { UIState } from '../reducers/uistate.reducers';
import { getUIState } from '../selectors/uistate.selectors';

export const getRouteState = createSelector(
  getUIState,
  (state: UIState) => state.router
);

export const getParamsFromRouteState = createSelector(
  getRouteState,
  (state) => state != undefined && state.state != undefined ? state.state.params : undefined
);

export const getQueryParamsFromRouteState = createSelector(
  getRouteState,
  (state) => state != undefined && state.state != undefined ? state.state.queryParams : undefined
);

export const getActiveRouteURL = createSelector(
  getRouteState,
  (state) => state?.state?.url
);

export const routeStateQuery = {
  getRouteState,
  getParamsFromRouteState,
  getQueryParamsFromRouteState,
  getActiveRouteURL
};
