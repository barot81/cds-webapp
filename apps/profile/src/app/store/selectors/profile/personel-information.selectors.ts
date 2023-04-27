import { createSelector } from '@ngrx/store';
import lodash from 'lodash';

import { StudentProfileAppState, personelInformationAdapter, PersonelInformationState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getPersonelInformationState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.personelInformation
);

export const {
  selectAll: getPersonelInformation
} = personelInformationAdapter.getSelectors(getPersonelInformationState);

export const isPersonelInformationLoading = createSelector(
  getPersonelInformationState,
  (state: PersonelInformationState) => state.loading
);

export const isPersonelInformationSaving = createSelector(
  getPersonelInformationState,
  (state: PersonelInformationState) => state.saving
);

export const personelInformation = createSelector(
  getPersonelInformationState,
  getPersonelInformation,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return !lodash.isEmpty(routeParam) && !!routeParam && entities.find(x => x?.id.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedPersonelinformation = id =>
  createSelector(
    getPersonelInformation,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );



export const personelInformationQuery = {
  getPersonelInformation,
  isPersonelInformationLoading,
  isPersonelInformationSaving,
  getSelectedPersonelinformation,
  personelInformation
};
