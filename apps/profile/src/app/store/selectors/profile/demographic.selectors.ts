import { createSelector } from '@ngrx/store';

import { StudentProfileAppState, demographicAdapter, DemographicState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getDemographicState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.demographic
);

export const {
  selectAll: getDemographic
} = demographicAdapter.getSelectors(getDemographicState);

export const isDemographicLoading = createSelector(
  getDemographicState,
  (state: DemographicState) => state.loading
);

export const isDemographicSaving = createSelector(
  getDemographicState,
  (state: DemographicState) => state.saving
);

export const demographic = createSelector(
  getDemographicState,
  getDemographic,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return routeParam && entities.find(x => x?.id.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedDemographic = id =>
  createSelector(
    getDemographic,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );


export const demographicQuery = {
  getDemographic,
  getSelectedDemographic,
  isDemographicLoading,
  isDemographicSaving,
  demographic
};
