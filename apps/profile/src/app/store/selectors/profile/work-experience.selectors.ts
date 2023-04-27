import { createSelector } from '@ngrx/store';
import lodash from 'lodash';

import { StudentProfileAppState, workExperienceAdapter, WorkExperienceState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getWorkExperienceState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.workExperience
);

export const {
  selectAll: getAllWorkExperience
} = workExperienceAdapter.getSelectors(getWorkExperienceState);

export const isWorkExperienceLoading = createSelector(
  getWorkExperienceState,
  (state: WorkExperienceState) => state.loading
);

export const isWorkExperienceSaving = createSelector(
  getWorkExperienceState,
  (state: WorkExperienceState) => state.saving
);

export const workExperience = createSelector(
  getWorkExperienceState,
  getAllWorkExperience,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return !lodash.isEmpty(routeParam) && !!routeParam && entities.filter(x => x.studentId != null && x.studentId.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedWorkExperience = id =>
  createSelector(
    getAllWorkExperience,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );


export const workExperienceQuery = {
  getAllWorkExperience,
  getSelectedWorkExperience,
  isWorkExperienceLoading,
  isWorkExperienceSaving,
  workExperience
};
