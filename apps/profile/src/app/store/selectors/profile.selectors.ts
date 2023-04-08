import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentProfileAppState } from '../reducers/profile.reducers';

export const getStudentProfileAppState = createFeatureSelector<StudentProfileAppState>(
  'profile'
);

export const getAppState = createSelector(
  getStudentProfileAppState,
  (state: StudentProfileAppState) => state
);
