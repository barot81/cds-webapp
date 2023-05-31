import {
 TokenModel
} from '@zhealthcare/fusion/models';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { OrgReducer, OrgState } from '../reducers/org.reducers';
import { UserReducer, UserState } from '../reducers/user.reducers';
import { getFusionAppState } from './app.selectors';
export interface AppState {
  app: UserState;
  org: OrgState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: UserReducer,
  org: OrgReducer,
};

export const getUserState = createSelector(
  getFusionAppState,
  (state: AppState) => state.app
);

export const getOrgState = createSelector(
  getFusionAppState,
  (state: AppState) => state.org
);

export const getAuthState = createSelector(getUserState, (state: UserState) =>
  state.user !== null ? state.user.Token : new TokenModel()
);

export const isUserLoaded = createSelector(
  getUserState,
  (state: UserState) => state.isLoaded
);

export const getTokenExpiration = createSelector(
  getUserState,
  (state: UserState) => {
    return state.tokenSessionInfo;
  }
);

export const getSelectedStatus = createSelector(
  getOrgState,
  (state: OrgState) => {
    return state.FacilityWiseStatuses.StatusCount.find(x=>x.isSelected).name
  }
);

export const getSelectedFacility = createSelector(
  getOrgState,
  (state: OrgState) => {
    return state.FacilityWiseStatuses.FacilityId;
  }
);

