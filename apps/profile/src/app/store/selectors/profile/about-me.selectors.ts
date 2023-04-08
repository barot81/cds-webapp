import { createSelector } from '@ngrx/store';
import lodash from 'lodash';

import { StudentProfileAppState, aboutMeAdapter, AboutMeState } from '../../reducers';
import { getStudentProfileAppState } from '../profile.selectors';
import { getParamsFromRouteState } from '@exxat/ux';

export const getAboutMeState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state.aboutMe
);

export const {
  selectAll: getAboutMe
} = aboutMeAdapter.getSelectors(getAboutMeState);

export const isAboutMeLoading = createSelector(
  getAboutMeState,
  (state: AboutMeState) => state.loading
);

export const isAboutMeSaving = createSelector(
  getAboutMeState,
  (state: AboutMeState) => state.saving
);

export const aboutMe = createSelector(
  getAboutMeState,
  getAboutMe,
  getParamsFromRouteState,
  (state, entities, routeParam) => {
    return !lodash.isEmpty(routeParam) && !!routeParam && entities.find(x => x?.id.toLowerCase() === routeParam?.profileId?.toLowerCase())
  }
);

export const getSelectedAboutMe = id =>
  createSelector(
    getAboutMe,
    (state) => {
      const result = id !== 0 ? state.find(it => it['id'].toLowerCase() === id.toLowerCase()) : undefined;
      return Object.assign({}, result);
    }
  );


export const aboutMeQuery = {
  getAboutMe,
  getSelectedAboutMe,
  isAboutMeLoading,
  isAboutMeSaving,
  aboutMe
};
