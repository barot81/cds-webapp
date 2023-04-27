import { createSelector } from '@ngrx/store';

import { StudentProfileAppState, studentTagAdapter, StudentTagState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getStudentTagState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.studentTag
);

export const {
  selectAll: getAllStudentTag,
  selectIds: getAllStudentTagIds,
  selectEntities: getAllStudentTagEntities,
} = studentTagAdapter.getSelectors(getStudentTagState);

export const isStudentTagLoading = createSelector(
  getStudentTagState,
  (state: StudentTagState) => state.loading
);

export const isStudentTagSaving = createSelector(
  getStudentTagState,
  (state: StudentTagState) => state.saving
);

export const studentTag = createSelector(
  getStudentTagState,
  getAllStudentTag,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return routeParam && entities.filter(x => x.studentId != null && x.studentId.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedStudentTag = id =>
  createSelector(
    getAllStudentTag,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );


export const studentTagQuery = {
  getAllStudentTag,
  getSelectedStudentTag,
  getAllStudentTagIds,
  getAllStudentTagEntities,
  isStudentTagLoading,
  isStudentTagSaving,
  studentTag
};
