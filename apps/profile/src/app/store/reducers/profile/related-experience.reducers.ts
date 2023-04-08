import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RelatedExperience } from '@exxat/profile/models';
import * as RelatedExperienceActions from '../../actions/profile/related-experience.actions';
import { Logger } from '@exxat/fusion/core';

export interface RelatedExperienceState extends EntityState<RelatedExperience> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const relatedExperienceAdapter: EntityAdapter<RelatedExperience> = createEntityAdapter<RelatedExperience>();

export const RelatedExperienceInitialState: RelatedExperienceState = relatedExperienceAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const relatedExperienceReducer = createReducer(
  RelatedExperienceInitialState,
  on(RelatedExperienceActions.LoadRelatedExperience, (state: RelatedExperienceState) => {
    Logger.trace(`StudentModule : LoadRelatedExperience action called in RelatedExperienceReducer`);
    return { ...state, loading: true };
  }),
  on(RelatedExperienceActions.RelatedExperienceLoaded, (state: RelatedExperienceState, { payload }) => {
    Logger.trace(`StudentModule : RelatedExperienceLoaded action called in RelatedExperienceReducer`);
    state = { ...state, loading: false };
    if (payload) {
      return relatedExperienceAdapter.addMany(payload, state);
    }else{
      return state;
    }
  }),
  on(RelatedExperienceActions.RelatedExperienceLoadError, (state: RelatedExperienceState, { payload }) => {
    Logger.trace(`StudentModule : RelatedExperienceLoadError action called in RelatedExperienceReducer`);
    return { ...state, loading: true };
  }),
  on(RelatedExperienceActions.UpdateRelatedExperience, (state: RelatedExperienceState) => {
    Logger.trace(`StudentModule : UpdateRelatedExperience action called in RelatedExperienceReducer`);
    return { ...state, saving: true };
  }),
  on(RelatedExperienceActions.UpdateRelatedExperienceSuccess, (state: RelatedExperienceState, { payload }) => {
    Logger.trace(`StudentModule : UpdateRelatedExperienceSuccess action called in RelatedExperienceReducer`);
    state = { ...state, saving: false };
    return relatedExperienceAdapter.updateOne(payload, state)
  }),
  on(RelatedExperienceActions.AddRelatedExperience, (state: RelatedExperienceState) => {
    Logger.trace(`StudentModule : AddRelatedExperience action called in RelatedExperienceReducer`);
    return { ...state, saving: true };
  }),
  on(RelatedExperienceActions.AddRelatedExperienceSuccess, (state: RelatedExperienceState, { payload }) => {
    Logger.trace(`StudentModule : AddRelatedExperienceSuccess action called in RelatedExperienceReducer`);
    state = { ...state, saving: false };
    return relatedExperienceAdapter.addOne(payload, state)
  }),
  on(RelatedExperienceActions.DeleteRelatedExperience, (state: RelatedExperienceState) => {
    Logger.trace(`StudentModule : DeleteRelatedExperience action called in RelatedExperienceReducer`);
    return { ...state, saving: true };
  }),
  on(RelatedExperienceActions.DeleteRelatedExperienceSuccess, (state: RelatedExperienceState, { payload }) => {
    Logger.trace(`StudentModule : DeleteRelatedExperienceSuccess action called in RelatedExperienceReducer`);
    state = { ...state, saving: false };
    return relatedExperienceAdapter.removeOne(payload, state)
  }),
);

export function RelatedExperienceReducer(state: RelatedExperienceState | undefined, action: Action) {
  return relatedExperienceReducer(state, action);
}
