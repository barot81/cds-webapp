import { createSelector } from '@ngrx/store';
import { getParamsFromRouteState } from '@exxat/ux';

import { getStudentProfileAppState } from './profile.selectors';
import { StudentProfileAppState, studentProfileCacheAdapter, StudentProfileCacheState } from '../reducers';

export const getStudentProfileCacheState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state[".cache"]
);

export const {
  selectAll: getProfileCache
} = studentProfileCacheAdapter.getSelectors(getStudentProfileCacheState);

export const {
  selectIds,
  selectEntities,
} = studentProfileCacheAdapter.getSelectors(getStudentProfileCacheState);

export const profileCachedIds = selectIds;

export const profileCachedEntities = selectEntities;


export const getCachedEntity = createSelector(
  getProfileCache,
  getParamsFromRouteState,
  (state, routeparam) => {
    const result = routeparam && routeparam?.profileId != null ? state.find(x => x['id'] != null && x['id'].toLowerCase() === routeparam?.profileId?.toLowerCase()) : undefined;
    return Object.assign({}, result);
  }
)

export const profileCachedIdsLookup = entity => createSelector(
  getStudentProfileCacheState,
  profileCachedIds,
  getCachedEntity,
  getParamsFromRouteState,
  (state, ids, cachedEntity, routeParam) => {
    if (ids.some(x => x === routeParam?.profileId) && cachedEntity[entity] === true)
      return true
    else return false;
  }
);

export const profileCacheQuery = {
  profileCachedIds,
  profileCachedEntities,
  profileCachedIdsLookup
};
