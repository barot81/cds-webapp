import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Consent } from '@exxat/profile/models';
import * as ConsentActions from '../../actions/profile/consent.actions';
import { Logger } from '@exxat/fusion/core';

export interface ConsentState extends EntityState<Consent> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const consentAdapter: EntityAdapter<Consent> = createEntityAdapter<Consent>();

export const consentInitialState: ConsentState = consentAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

 const consentReducer = createReducer(
  consentInitialState,
  on(ConsentActions.LoadConsent, (state: ConsentState) => {
    Logger.trace(`StudentModule : LoadConsent action called in ConsentReducer`);
    return { ...state, loading: true };
  }),
  on(ConsentActions.ConsentLoaded, (state: ConsentState, { payload }) => {
    Logger.trace(`StudentModule : ConsentLoaded action called in ConsentReducer`);
    if(payload){
      return consentAdapter.addMany(payload, state)
    }
    else{
      return state;
    }
  }),
  on(ConsentActions.ConsentLoadError, (state: ConsentState, { payload }) => {
    Logger.trace(`StudentModule : ConsentLoadError action called in ConsentReducer`);
    return { ...state, loading: true };
  }),
  on(ConsentActions.AddConsent, (state: ConsentState) => {
    Logger.trace(`StudentModule : AddConsent action called in ConsentReducer`);
    return { ...state, saving: true };
  }),
  on(ConsentActions.AddConsentSuccess, (state: ConsentState, { payload }) => {
    Logger.trace(`StudentModule : AddConsentSuccess action called in ConsentReducer`);
    state = { ...state, saving: false };
    return consentAdapter.addOne(payload, state)
  }),
);

export function ConsentReducer(state: ConsentState | undefined, action: Action) {
  return consentReducer(state, action);
}
