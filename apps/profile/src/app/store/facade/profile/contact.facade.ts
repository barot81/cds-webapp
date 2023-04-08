import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Contact } from '@exxat/profile/models';

import * as fromActions from '../../actions/profile/contact.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';
type GUID = string & { isGuid: true };
import { contactQuery } from '../../selectors/profile/contact.selectors';

@Injectable({providedIn: 'any'})
export class ContactFacade {
  contact$ = this.store.pipe(select(contactQuery.contact));
  loading$ = this.store.pipe(select(contactQuery.isContactLoading));
  saving$ = this.store.pipe(select(contactQuery.isContactSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }


  selectedContact(id: string) {
    return this.store.pipe(select(contactQuery.getSelectedContact(id)));
  }

  updateContact(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateContact({ id: profileId, payload: patch }));
  }

  addContact(entity: Contact) {
    this.store.dispatch(fromActions.AddContact({ payload: entity }));
  }

}
