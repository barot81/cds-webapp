import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Demographic } from '@exxat/profile/models';
import * as DemographicActions from '../../actions/profile/demographic.actions';
import { Logger } from '@exxat/fusion/core';

export interface DemographicState extends EntityState<Demographic> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const demographicAdapter: EntityAdapter<Demographic> = createEntityAdapter<Demographic>();

export const DemographicInitialState: DemographicState = demographicAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const demographicReducer = createReducer(
  DemographicInitialState,
  on(DemographicActions.LoadDemographic, (state: DemographicState) => {
    Logger.trace(`StudentModule : LoadDemographic action called in DemographicReducer`);
    return { ...state, loading: true };
  }),
  on(DemographicActions.DemographicLoaded, (state: DemographicState, { payload }) => {
    Logger.trace(`StudentModule : DemographicLoaded action called in DemographicReducer`);
    state = { ...state, loading: false };
    if (payload) {
      return demographicAdapter.addOne(payload, state);
    }else{
      return state;
    }
  }),
  on(DemographicActions.DemographicLoadError, (state: DemographicState, { payload }) => {
    Logger.trace(`StudentModule : DemographicLoadError action called in DemographicReducer`);
    return { ...state, loading: true };
  }),
  on(DemographicActions.UpdateDemographic, (state: DemographicState) => {
    Logger.trace(`StudentModule : UpdateDemographic action called in DemographicReducer`);
    return { ...state, saving: true };
  }),
  on(DemographicActions.UpdateDemographicSuccess, (state: DemographicState, { payload }) => {
    Logger.trace(`StudentModule : UpdateDemographicSuccess action called in DemographicReducer`);
    state = { ...state, saving: false };
    return demographicAdapter.updateOne(payload, state)
  }),
  on(DemographicActions.AddDemographic, (state: DemographicState) => {
    Logger.trace(`StudentModule : AddDemographic action called in DemographicReducer`);
    return { ...state, saving: true };
  }),
  on(DemographicActions.AddDemographicSuccess, (state: DemographicState, { payload }) => {
    Logger.trace(`StudentModule : AddDemographicSuccess action called in DemographicReducer`);
    state = { ...state, saving: false };
    return demographicAdapter.addOne(payload, state)
  }),
);

export function DemographicReducer(state: DemographicState | undefined, action: Action) {
  return demographicReducer(state, action);
}
