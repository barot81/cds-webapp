import { Logger } from '@exxat/fusion/core';
import { Enrollment } from '@exxat/profile/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as EnrollmentActions from '../../actions/profile/enrollment.actions';

export interface EnrollmentState extends EntityState<Enrollment> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const enrollmentAdapter: EntityAdapter<Enrollment> = createEntityAdapter<Enrollment>();

export const EnrollmentInitialState: EnrollmentState = enrollmentAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const enrollmentReducer = createReducer(
  EnrollmentInitialState,
  on(EnrollmentActions.LoadEnrollment, (state: EnrollmentState) => {
    Logger.trace(`StudentModule : LoadEnrollment action called in EnrollmentReducer`);
    return { ...state, loading: true };
  }),
  on(EnrollmentActions.EnrollmentLoaded, (state: EnrollmentState, { payload }) => {
    Logger.trace(`StudentModule : EnrollmentLoaded action called in EnrollmentReducer`);
    state = { ...state, loading: false };
    if (payload) {
      return enrollmentAdapter.addOne(payload, state);
    } else {
      return state;
    }
  }),
  on(EnrollmentActions.EnrollmentLoadError, (state: EnrollmentState, { payload }) => {
    Logger.trace(`StudentModule : EnrollmentLoadError action called in EnrollmentReducer`);
    return { ...state, loading: true };
  }),
  on(EnrollmentActions.UpdateEnrollment, (state: EnrollmentState) => {
    Logger.trace(`StudentModule : UpdateEnrollment action called in EnrollmentReducer`);
    return { ...state, saving: true };
  }),
  on(EnrollmentActions.UpdateStudentNumber, (state: EnrollmentState) => {
    Logger.trace(`StudentModule : UpdateStudentNumber action called in EnrollmentReducer`);
    return { ...state, saving: true };
  }),
  on(EnrollmentActions.PatchEnrollment, (state: EnrollmentState,{ payload }) => {
    Logger.trace(
      `StudentModule : PatchEnrollment action called in EnrollmentReducer`
    );
    state = { ...state, saving: false };
    return enrollmentAdapter.upsertMany(payload, state);
  }),
  on(EnrollmentActions.UpdateEnrollmentSuccess, (state: EnrollmentState, { payload }) => {
    Logger.trace(`StudentModule : UpdateEnrollmentSuccess action called in EnrollmentReducer`);
    state = { ...state, saving: false };
    return enrollmentAdapter.updateOne(payload, state)
  }),
  on(EnrollmentActions.AddEnrollment, (state: EnrollmentState) => {
    Logger.trace(`StudentModule : AddEnrollment action called in EnrollmentReducer`);
    return { ...state, saving: true };
  }),
  on(EnrollmentActions.AddEnrollmentSuccess, (state: EnrollmentState, { payload }) => {
    Logger.trace(`StudentModule : AddEnrollmentSuccess action called in EnrollmentReducer`);
    state = { ...state, saving: false };
    return enrollmentAdapter.addOne(payload, state)
  }),
);

export function EnrollmentReducer(state: EnrollmentState | undefined, action: Action) {
  return enrollmentReducer(state, action);
}
