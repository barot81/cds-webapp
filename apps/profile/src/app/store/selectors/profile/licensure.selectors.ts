import { createSelector } from '@ngrx/store';

import { StudentProfileAppState, licensureAdapter, LicensureState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getLicensureState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.licensure
);

export const {
  selectAll: getAllLicensure
} = licensureAdapter.getSelectors(getLicensureState);

export const isLicensureLoading = createSelector(
  getLicensureState,
  (state: LicensureState) => state.loading
);

export const isLicensureSaving = createSelector(
  getLicensureState,
  (state: LicensureState) => state.saving
);

export const licensure = createSelector(
  getLicensureState,
  getAllLicensure,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return routeParam && entities.filter(x => x.studentId != null && x.studentId.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedLicensure = id =>
  createSelector(
    getAllLicensure,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );


export const licensureQuery = {
  getAllLicensure,
  getSelectedLicensure,
  isLicensureLoading,
  isLicensureSaving,
  licensure
};
