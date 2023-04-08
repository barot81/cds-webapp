import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AboutMe } from '@exxat/profile/models';
import * as AboutMeActions from '../../actions/profile/about-me.actions';
import { Logger } from '@exxat/fusion/core';


export interface AboutMeState extends EntityState<AboutMe> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const aboutMeAdapter: EntityAdapter<AboutMe> = createEntityAdapter<AboutMe>();

export const AboutMeInitialState: AboutMeState = aboutMeAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const aboutMeReducer = createReducer(
  AboutMeInitialState,
  on(AboutMeActions.LoadAboutMe, (state: AboutMeState) => {
    Logger.trace(`StudentModule : LoadAboutMe action called in AboutMeReducer`);
    return { ...state, loading: true };
  }),
  on(AboutMeActions.AboutMeLoaded, (state: AboutMeState, { payload }) => {
    Logger.trace(`StudentModule : AboutMeLoaded action called in AboutMeReducer`);
    state = { ...state, loading: false };
    if (payload) {
      return aboutMeAdapter.addOne(payload, state);
    } else {
      return state;
    }
  }),
  on(AboutMeActions.AboutMeLoadError, (state: AboutMeState, { payload }) => {
    Logger.trace(`StudentModule : AboutMeLoadError action called in AboutMeReducer`);
    return { ...state, loading: true };
  }),
  on(AboutMeActions.UpdateAboutMe, (state: AboutMeState) => {
    Logger.trace(`StudentModule : UpdateAboutMe action called in AboutMeReducer`);
    return { ...state, saving: true };
  }),
  on(AboutMeActions.UpdateAboutMeSuccess, (state: AboutMeState, { payload }) => {
    Logger.trace(`StudentModule : UpdateAboutMeSuccess action called in AboutMeReducer`);
    state = { ...state, saving: false };
    return aboutMeAdapter.updateOne(payload, state)
  }),

  on(AboutMeActions.UpdateResumeKey, (state: AboutMeState) => {
    Logger.trace(`StudentModule : UpdateResumeKey action called in AboutMeReducer`);
    return { ...state, saving: true };
  }),
  on(AboutMeActions.AddAboutMe, (state: AboutMeState) => {
    Logger.trace(`StudentModule : AddAboutMe action called in AboutMeReducer`);
    return { ...state, saving: true };
  }),
  on(AboutMeActions.AddAboutMeSuccess, (state: AboutMeState, { payload }) => {
    Logger.trace(`StudentModule : AddAboutMeSuccess action called in AboutMeReducer`);
    state = { ...state, saving: false };
    return aboutMeAdapter.addOne(payload, state)
  }),
);

export function AboutMeReducer(state: AboutMeState | undefined, action: Action) {
  return aboutMeReducer(state, action);
}
