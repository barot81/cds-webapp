import { createSelector } from '@ngrx/store';
import lodash from 'lodash';

import { StudentProfileAppState, relatedExperienceAdapter, RelatedExperienceState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getRelatedExperienceState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.relatedExperience
);

export const {
  selectAll: getAllRelatedExperience
} = relatedExperienceAdapter.getSelectors(getRelatedExperienceState);

export const isRelatedExperienceLoading = createSelector(
  getRelatedExperienceState,
  (state: RelatedExperienceState) => state.loading
);

export const isRelatedExperienceSaving = createSelector(
  getRelatedExperienceState,
  (state: RelatedExperienceState) => state.saving
);

export const relatedExperience = createSelector(
  getRelatedExperienceState,
  getAllRelatedExperience,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return !lodash.isEmpty(routeParam) && !!routeParam && entities.filter(x => x.studentId != null && x.studentId.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedRelatedExperience = id =>
  createSelector(
    getAllRelatedExperience,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );


export const relatedExperienceQuery = {
  getAllRelatedExperience,
  getSelectedRelatedExperience,
  isRelatedExperienceLoading,
  isRelatedExperienceSaving,
  relatedExperience
};
