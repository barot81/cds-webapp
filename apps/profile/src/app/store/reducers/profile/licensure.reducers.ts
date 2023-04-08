import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Licensure } from '@exxat/profile/models';
import * as LicensureActions from '../../actions/profile/licensure.actions';
import { Logger } from '@exxat/fusion/core';

export interface LicensureState extends EntityState<Licensure> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const licensureAdapter: EntityAdapter<Licensure> = createEntityAdapter<Licensure>();

export const LicensureInitialState: LicensureState = licensureAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const licensureReducer = createReducer(
  LicensureInitialState,
  on(LicensureActions.LoadLicensure, (state: LicensureState) => {
    Logger.trace(`StudentModule : LoadLicensure action called in LicensureReducer`);
    return { ...state, loading: true };
  }),
  on(LicensureActions.LicensureLoaded, (state: LicensureState, { payload }) => {
    Logger.trace(`StudentModule : LicensureLoaded action called in LicensureReducer`);
    state = { ...state, loading: false };
    if (payload) {
      return licensureAdapter.addMany(payload, state);
    }
    else{
      return state;
    }
  }),
  on(LicensureActions.LicensureLoadError, (state: LicensureState, { payload }) => {
    Logger.trace(`StudentModule : LicensureLoadError action called in LicensureReducer`);
    return { ...state, loading: true };
  }),
  on(LicensureActions.UpdateLicensure, (state: LicensureState) => {
    Logger.trace(`StudentModule : UpdateLicensure action called in LicensureReducer`);
    return { ...state, saving: true };
  }),
  on(LicensureActions.UpdateLicensureSuccess, (state: LicensureState, { payload }) => {
    Logger.trace(`StudentModule : UpdateLicensureSuccess action called in LicensureReducer`);
    state = { ...state, saving: false };
    return licensureAdapter.updateOne(payload, state)
  }),
  on(LicensureActions.AddLicensure, (state: LicensureState) => {
    Logger.trace(`StudentModule : AddLicensure action called in LicensureReducer`);
    return { ...state, saving: true };
  }),
  on(LicensureActions.AddLicensureSuccess, (state: LicensureState, { payload }) => {
    Logger.trace(`StudentModule : AddLicensureSuccess action called in LicensureReducer`);
    state = { ...state, saving: false };
    return licensureAdapter.addOne(payload, state)
  }),
  on(LicensureActions.DeleteLicensure, (state: LicensureState) => {
    Logger.trace(`StudentModule : DeleteLicensure action called in LicensureReducer`);
    return { ...state, saving: true };
  }),
  on(LicensureActions.DeleteLicensureSuccess, (state: LicensureState, { payload }) => {
    Logger.trace(`StudentModule : DeleteLicensureSuccess action called in LicensureReducer`);
    state = { ...state, saving: false };
    return licensureAdapter.removeOne(payload, state)
  }),
);

export function LicensureReducer(state: LicensureState | undefined, action: Action) {
  return licensureReducer(state, action);
}
