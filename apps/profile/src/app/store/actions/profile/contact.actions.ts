import { createAction, props } from '@ngrx/store';

import { Contact } from '@exxat/profile/models';
type GUID = string & { isGuid: true };

export const LoadContact = createAction(
  '[Load Contact] Load Contact',
  props<{ payload: string}>()
);

export const ContactLoaded = createAction(
  '[Contact Loaded] Contact Loaded',
  props<{ payload: Contact}>()
);

export const UpdateContact = createAction(
  '[Update Contact] Update Contact',
  props<{ id: GUID, payload: any }>()
);

export const UpdateContactSuccess = createAction(
  '[Update Contact Success] Update Contact Success',
  props<{ payload: any }>()
);

export const AddContact = createAction(
  '[Add Contact] Add Contact',
  props<{ payload: Contact }>()
);

export const AddContactSuccess = createAction(
  '[Add Contact Success] Add Contact Success',
  props<{ payload: Contact }>()
);

export const ContactLoadError = createAction(
  '[Contact Load Error] Contact Load Error',
  props<{ payload: any }>()
);
