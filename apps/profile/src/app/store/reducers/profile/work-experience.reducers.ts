import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { WorkExperience } from '@exxat/profile/models';
import * as WorkExperienceActions from '../../actions/profile/work-experience.actions';
import { Logger } from '@exxat/fusion/core';

export interface WorkExperienceState extends EntityState<WorkExperience> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const workExperienceAdapter: EntityAdapter<WorkExperience> = createEntityAdapter<WorkExperience>();

export const WorkExperienceInitialState: WorkExperienceState = workExperienceAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const workExperienceReducer = createReducer(
  WorkExperienceInitialState,
  on(WorkExperienceActions.LoadWorkExperience, (state: WorkExperienceState) => {
    Logger.trace(`StudentModule : LoadWorkExperience action called in WorkExperienceReducer`);
    return { ...state, loading: true };
  }),
  on(WorkExperienceActions.WorkExperienceLoaded, (state: WorkExperienceState, { payload }) => {
    Logger.trace(`StudentModule : WorkExperienceLoaded action called in WorkExperienceReducer`);
    state = { ...state, loading: false };
    if (payload) {
      return workExperienceAdapter.addMany(payload, state);
    }else{
      return state;
    }
  }),
  on(WorkExperienceActions.WorkExperienceLoadError, (state: WorkExperienceState, { payload }) => {
    Logger.trace(`StudentModule : WorkExperienceLoadError action called in WorkExperienceReducer`);
    return { ...state, loading: true };
  }),
  on(WorkExperienceActions.UpdateWorkExperience, (state: WorkExperienceState) => {
    Logger.trace(`StudentModule : UpdateWorkExperience action called in WorkExperienceReducer`);
    return { ...state, saving: true };
  }),
  on(WorkExperienceActions.UpdateWorkExperienceSuccess, (state: WorkExperienceState, { payload }) => {
    Logger.trace(`StudentModule : UpdateWorkExperienceSuccess action called in WorkExperienceReducer`);
    state = { ...state, saving: false };
    return workExperienceAdapter.updateOne(payload, state)
  }),
  on(WorkExperienceActions.AddWorkExperience, (state: WorkExperienceState) => {
    Logger.trace(`StudentModule : AddWorkExperience action called in WorkExperienceReducer`);
    return { ...state, saving: true };
  }),
  on(WorkExperienceActions.AddWorkExperienceSuccess, (state: WorkExperienceState, { payload }) => {
    Logger.trace(`StudentModule : AddWorkExperienceSuccess action called in WorkExperienceReducer`);
    state = { ...state, saving: false };
    return workExperienceAdapter.addOne(payload, state)
  }),
  on(WorkExperienceActions.DeleteWorkExperience, (state: WorkExperienceState) => {
    Logger.trace(`StudentModule : DeleteWorkExperience action called in WorkExperienceReducer`);
    return { ...state, saving: true };
  }),
  on(WorkExperienceActions.DeleteWorkExperienceSuccess, (state: WorkExperienceState, { payload }) => {
    Logger.trace(`StudentModule : DeleteWorkExperienceSuccess action called in WorkExperienceReducer`);
    state = { ...state, saving: false };
    return workExperienceAdapter.removeOne(payload, state)
  }),
);

export function WorkExperienceReducer(state: WorkExperienceState | undefined, action: Action) {
  return workExperienceReducer(state, action);
}
