import { createSelector } from '@ngrx/store';

import { StudentProfileAppState, contactAdapter, ContactState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getContactState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.contact
);

export const {
  selectAll: getContact
} = contactAdapter.getSelectors(getContactState);

export const isContactLoading = createSelector(
  getContactState,
  (state: ContactState) => state.loading
);

export const isContactSaving = createSelector(
  getContactState,
  (state: ContactState) => state.saving
);

export const contact = createSelector(
  getContactState,
  getContact,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return routeParam && entities.find(x => x?.id.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedContact = id =>
  createSelector(
    getContact,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );


export const contactQuery = {
  getContact,
  getSelectedContact,
  isContactLoading,
  isContactSaving,
  contact
};
