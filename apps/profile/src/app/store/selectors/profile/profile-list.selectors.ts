import { createSelector } from '@ngrx/store';

import {
  StudentProfileAppState,
  ProfileListState,
  profileListAdapter,
} from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';
import lodash from 'lodash';

export const getProfileListState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.profileList
);

export const { selectAll: getAllProfileList } =
  profileListAdapter.getSelectors(getProfileListState);

export const isProfileListLoading = createSelector(
  getProfileListState,
  (state: ProfileListState) => state.loading
);

export const isProfileListSaving = createSelector(
  getProfileListState,
  (state: ProfileListState) => state.saving
);

export const count = createSelector(
  getProfileListState,
  (state: ProfileListState) => state.count
);
export const profileList = createSelector(
  getProfileListState,
  getAllProfileList,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return routeParam && entities;
  }
);

export const selectedProfile = createSelector(
  getProfileListState,
  getAllProfileList,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return (
      !lodash.isEmpty(routeParam) &&
      !!routeParam &&
      entities.find(
        (x) => x?.id?.toLowerCase() === routeParam?.profileId?.toLowerCase()
      )
    );
  }
);

export const getSelectedProfile = (id) =>
  createSelector(getAllProfileList, (state) => {
    const result =
      id !== 0
        ? state.find((it) => it['id'].toLowerCase() === id.toLowerCase())
        : undefined;
    return Object.assign({}, result);
  });

export const profileListQuery = {
  getAllProfileList,
  getSelectedProfile,
  isProfileListLoading,
  isProfileListSaving,
  count,
  profileList,
  selectedProfile,
};
