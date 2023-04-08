import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Education } from '@exxat/profile/models';
import * as EducationActions from '../../actions/profile/education.actions';
import { Logger } from '@exxat/fusion/core';

export interface EducationState extends EntityState<Education> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const educationAdapter: EntityAdapter<Education> = createEntityAdapter<Education>();

export const EducationInitialState: EducationState = educationAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const educationReducer = createReducer(
  EducationInitialState,
  on(EducationActions.LoadEducation, (state: EducationState) => {
    Logger.trace(`StudentModule : LoadEducation action called in EducationReducer`);
    return { ...state, loading: true };
  }),
  on(EducationActions.EducationLoaded, (state: EducationState, { payload }) => {
    Logger.trace(`StudentModule : EducationLoaded action called in EducationReducer`);
    state = { ...state, loading: false };
    if (payload) {
      return educationAdapter.addMany(payload, state);
    }else{
      return state;
    }
  }),
  on(EducationActions.EducationLoadError, (state: EducationState, { payload }) => {
    Logger.trace(`StudentModule : EducationLoadError action called in EducationReducer`);
    return { ...state, loading: true };
  }),
  on(EducationActions.UpdateEducation, (state: EducationState) => {
    Logger.trace(`StudentModule : UpdateEducation action called in EducationReducer`);
    return { ...state, saving: true };
  }),
  on(EducationActions.UpdateEducationSuccess, (state: EducationState, { payload }) => {
    Logger.trace(`StudentModule : UpdateEducationSuccess action called in EducationReducer`);
    state = { ...state, saving: false };
    return educationAdapter.updateOne(payload, state)
  }),
  on(EducationActions.AddEducation, (state: EducationState) => {
    Logger.trace(`StudentModule : AddEducation action called in EducationReducer`);
    return { ...state, saving: true };
  }),
  on(EducationActions.AddEducationSuccess, (state: EducationState, { payload }) => {
    Logger.trace(`StudentModule : AddEducationSuccess action called in EducationReducer`);
    state = { ...state, saving: false };
    return educationAdapter.addOne(payload, state)
  }),
  on(EducationActions.DeleteEducation, (state: EducationState) => {
    Logger.trace(`StudentModule : DeleteEducation action called in EducationReducer`);
    return { ...state, saving: true };
  }),
  on(EducationActions.DeleteEducationSuccess, (state: EducationState, { payload }) => {
    Logger.trace(`StudentModule : DeleteEducationSuccess action called in EducationReducer`);
    state = { ...state, saving: false };
    return educationAdapter.removeOne(payload, state)
  }),
);

export function EducationReducer(state: EducationState | undefined, action: Action) {
  return educationReducer(state, action);
}
