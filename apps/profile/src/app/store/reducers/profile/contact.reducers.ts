import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Contact } from '@exxat/profile/models';
import * as ContactActions from '../../actions/profile/contact.actions';
import { Logger } from '@exxat/fusion/core';

export interface ContactState extends EntityState<Contact> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const contactAdapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();

export const ContactInitialState: ContactState = contactAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const contactReducer = createReducer(
  ContactInitialState,
  on(ContactActions.LoadContact, (state: ContactState) => {
    Logger.trace(`StudentModule : LoadContact action called in ContactReducer`);
    return { ...state, loading: true };
  }),
  on(ContactActions.ContactLoaded, (state: ContactState, { payload }) => {
    Logger.trace(`StudentModule : ContactLoaded action called in ContactReducer`);
    state = { ...state, loading: false };
    if (payload) {
      return contactAdapter.addOne(payload, state);
    } else {
      return state;
    }
  }),
  on(ContactActions.ContactLoadError, (state: ContactState, { payload }) => {
    Logger.trace(`StudentModule : ContactLoadError action called in ContactReducer`);
    return { ...state, loading: true };
  }),
  on(ContactActions.UpdateContact, (state: ContactState) => {
    Logger.trace(`StudentModule : UpdateContact action called in ContactReducer`);
    return { ...state, saving: true };
  }),
  on(ContactActions.UpdateContactSuccess, (state: ContactState, { payload }) => {
    Logger.trace(`StudentModule : UpdateContactSuccess action called in ContactReducer`);
    state = { ...state, saving: false };
    return contactAdapter.updateOne(payload, state)
  }),
  on(ContactActions.AddContact, (state: ContactState) => {
    Logger.trace(`StudentModule : AddContact action called in ContactReducer`);
    return { ...state, saving: true };
  }),
  on(ContactActions.AddContactSuccess, (state: ContactState, { payload }) => {
    Logger.trace(`StudentModule : AddContactSuccess action called in ContactReducer`);
    state = { ...state, saving: false };
    return contactAdapter.addOne(payload, state)
  }),
);

export function ContactReducer(state: ContactState | undefined, action: Action) {
  return contactReducer(state, action);
}
