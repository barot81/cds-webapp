import { createSelector } from '@ngrx/store';
import { Education } from '@exxat/profile/models';

import { StudentProfileAppState, educationAdapter, EducationState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getEducationState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.education
);

export const {
  selectAll: getAllEducation,
  selectIds: getAllEducationIds,
  selectEntities: getAllEducationEntities,
} = educationAdapter.getSelectors(getEducationState);

export const isEducationLoading = createSelector(
  getEducationState,
  (state: EducationState) => state.loading
);

export const isEducationSaving = createSelector(
  getEducationState,
  (state: EducationState) => state.saving
);

export const education = createSelector(
  getEducationState,
  getAllEducation,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return routeParam && entities.filter(x => x.studentId != null && x.studentId.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedEducation = id =>
  createSelector(
    getAllEducation,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );

export const educationQuery = {
  getAllEducation,
  getSelectedEducation,
  getAllEducationIds,
  getAllEducationEntities,
  isEducationLoading,
  isEducationSaving,
  education
};
