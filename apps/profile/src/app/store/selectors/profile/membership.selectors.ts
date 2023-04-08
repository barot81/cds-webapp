import { createSelector } from '@ngrx/store';

import { StudentProfileAppState, membershipAdapter, MembershipState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getMembershipState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.membership
);

export const {
  selectAll: getAllMembership
} = membershipAdapter.getSelectors(getMembershipState);

export const isMembershipLoading = createSelector(
  getMembershipState,
  (state: MembershipState) => state.loading
);

export const isMembershipSaving = createSelector(
  getMembershipState,
  (state: MembershipState) => state.saving
);

export const membership = createSelector(
  getMembershipState,
  getAllMembership,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return routeParam && entities.filter(x => x.studentId != null && x.studentId.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);


export const getSelectedMembership = id =>
  createSelector(
    getAllMembership,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );


export const membershipQuery = {
  getAllMembership,
  getSelectedMembership,
  isMembershipLoading,
  isMembershipSaving,
  membership
};
