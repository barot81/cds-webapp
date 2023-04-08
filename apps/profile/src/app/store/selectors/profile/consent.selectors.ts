import { createSelector } from '@ngrx/store';
import { Consent } from '@exxat/profile/models';

import { StudentProfileAppState, consentAdapter, ConsentState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getConsentState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.consent
);

export const {
  selectAll: getAllConsent,
  selectIds: getAllConsentIds,
  selectEntities: getAllConsentEntities,
} = consentAdapter.getSelectors(getConsentState);

export const isConsentLoading = createSelector(
  getConsentState,
  (state: ConsentState) => state.loading
);

export const isConsentSaving = createSelector(
  getConsentState,
  (state: ConsentState) => state.saving
);

export const consents = createSelector(
  getConsentState,
  getAllConsent,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return routeParam && entities
  }
);
export const consent = createSelector(
  getConsentState,
  getAllConsent,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return routeParam && entities.filter(x => x.studentId != null && x.studentId.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedConsent = id =>
  createSelector(
    getAllConsent,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );

export const consentQuery = {
  getAllConsent,
  getSelectedConsent,
  getAllConsentIds,
  getAllConsentEntities,
  isConsentLoading,
  isConsentSaving,
  consent,
  consents
};
