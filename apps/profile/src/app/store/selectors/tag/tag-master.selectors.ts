import { createSelector } from '@ngrx/store';

import { StudentProfileAppState, tagMasterAdapter, TagMasterState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getTagMasterState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state?.tagMaster
);

export const {
  selectAll: getAllTagMaster
} = tagMasterAdapter.getSelectors(getTagMasterState);

export const isTagMasterLoading = createSelector(
  getTagMasterState,
  (state: TagMasterState) => state.loading
);

export const isTagMasterSaving = createSelector(
  getTagMasterState,
  (state: TagMasterState) => state.saving
);

export const tagMaster = createSelector(
  getTagMasterState,
  getAllTagMaster,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return routeParam && entities
  }
);

export const getSelectedTagMaster = id =>
  createSelector(
    getAllTagMaster,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );


export const tagMasterQuery = {
  getAllTagMaster,
  getSelectedTagMaster,
  isTagMasterLoading,
  isTagMasterSaving,
  tagMaster
};
