import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Consent } from '@exxat/profile/models';

import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { consentQuery } from '../../selectors/profile/consent.selectors';
import * as fromActions from '../../actions/profile/consent.actions';

@Injectable({providedIn: 'any'})
export class ConsentFacade {
  allConsent$ = this.store.pipe(select(consentQuery.consents));
  consent$ = this.store.pipe(select(consentQuery.consent));
  selectedConsent$ = this.store.pipe(select(consentQuery.getSelectedConsent));
  loading$ = this.store.pipe(select(consentQuery.isConsentLoading));
  saving$ = this.store.pipe(select(consentQuery.isConsentSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }

  getAllConsent() {
    this.store.dispatch(fromActions.LoadConsent());
  }

  getSelectedConsent(id: string) {
    return this.store.pipe(select(consentQuery.getSelectedConsent(id)));
  }

  updateConsent(consentId, patch: any) {
    this.store.dispatch(fromActions.UpdateConsent ({ id: consentId, payload: patch }));
  }

  addConsent(entity: Consent) {
    this.store.dispatch(fromActions.AddConsent({ payload: entity }));
  }

  deleteConsent(id) {
    this.store.dispatch(fromActions.DeleteConsent({ id: id }));
  }
}
