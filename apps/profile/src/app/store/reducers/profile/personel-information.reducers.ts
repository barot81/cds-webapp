import { Logger } from '@exxat/fusion/core';
import { Profile } from '@exxat/profile/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as PersonelInformationActions from '../../actions/profile/personel-information.actions';

export interface PersonelInformationState extends EntityState<Profile> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const personelInformationAdapter: EntityAdapter<Profile> = createEntityAdapter<Profile>();

export const PersonelInformationInitialState: PersonelInformationState = personelInformationAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const personelInformationReducer = createReducer(
  PersonelInformationInitialState,
  on(PersonelInformationActions.LoadPersonalInformation, (state: PersonelInformationState) => {
    Logger.trace(`StudentModule : LoadPersonalInformation action called in PersonelInformationReducer`);
    return { ...state, loading: true };
  }),
  on(PersonelInformationActions.PersonalInformationLoaded, (state: PersonelInformationState, { payload }) => {
    Logger.trace(`StudentModule : PersonalInformationLoaded action called in PersonelInformationReducer`);
    state = { ...state, loading: false };
    if (payload) {
      return personelInformationAdapter.addOne(payload, state);
    } else {
      return state;
    }
  }),
  on(PersonelInformationActions.PersonalInformationLoadError, (state: PersonelInformationState, { payload }) => {
    Logger.trace(`StudentModule : PersonalInformationLoadError action called in PersonelInformationReducer`);
    return { ...state, loading: true };
  }),
  on(PersonelInformationActions.UpdatePersonalInformation, (state: PersonelInformationState) => {
    Logger.trace(`StudentModule : UpdatePersonalInformation action called in PersonelInformationReducer`);
    return { ...state, saving: true };
  }),
  on(PersonelInformationActions.UpdatePersonalInformationSuccess, (state: PersonelInformationState, { payload }) => {
    Logger.trace(`StudentModule : UpdatePersonalInformationSuccess action called in PersonelInformationReducer`);
    state = { ...state, saving: false };
    return personelInformationAdapter.updateOne(payload, state)
  }),
  on(PersonelInformationActions.PatchPersonalInformation,(state:PersonelInformationState,{id, payload })=>{
    const existingData = {
      ...state?.entities[id],
    };
    existingData.fileCollectionKey = payload.fileCollectionKey;
    state = { ...state, saving: false };
    return personelInformationAdapter.updateOne(
      {
        id: id,
        changes: existingData,
      },
      state
    );
  }),
  on(PersonelInformationActions.AddPersonalInformation, (state: PersonelInformationState) => {
    Logger.trace(`StudentModule : AddPersonalInformation action called in PersonelInformationReducer`);
    return { ...state, saving: true };
  }),
  on(PersonelInformationActions.AddPersonalInformationSuccess, (state: PersonelInformationState, { payload }) => {
    Logger.trace(`StudentModule : AddPersonalInformationSuccess action called in PersonelInformationReducer`);
    state = { ...state, saving: false };
    return personelInformationAdapter.addOne(payload, state)
  }),
);

export function PersonelInformationReducer(state: PersonelInformationState | undefined, action: Action) {
  return personelInformationReducer(state, action);
}
