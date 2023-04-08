import { createSelector } from '@ngrx/store';
import lodash from 'lodash';

import { getParamsFromRouteState } from '@exxat/ux';
import { enrollmentAdapter, EnrollmentState, StudentProfileAppState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';

export const getEnrollmentState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.enrollment
);

export const {
  selectAll: getEnrollment
} = enrollmentAdapter.getSelectors(getEnrollmentState);

export const isEnrollmentLoading = createSelector(
  getEnrollmentState,
  (state: EnrollmentState) => state.loading
);

export const isEnrollmentSaving = createSelector(
  getEnrollmentState,
  (state: EnrollmentState) => state.saving
);

export const enrollment = createSelector(
  getEnrollmentState,
  getEnrollment,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return !lodash.isEmpty(routeParam) && !!routeParam && entities.find(x => x?.id.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedEnrollment = id =>
  createSelector(
    getEnrollment,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id']?.toLowerCase() === id?.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );

export const getEnrollmentsByCohortIdAndGroups = (cohortId, groups) =>
createSelector(
  getEnrollment,
  (state) => {
    let result = cohortId !== null && groups !== null ? state.filter(it => it['cohortId']?.toLowerCase() === cohortId?.toLowerCase()) : undefined;
    if(result && groups?.length > 0){
      result = result.filter(it => groups.some(x => x.toLowerCase() === it['groupName']?.toLowerCase()));
    }
    return [...result];
  }
);



export const enrollmentQuery = {
  getEnrollment,
  getSelectedEnrollment,
  getEnrollmentsByCohortIdAndGroups,
  isEnrollmentLoading,
  isEnrollmentSaving,
  enrollment
};
