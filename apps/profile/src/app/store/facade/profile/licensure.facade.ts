import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Licensure } from '@exxat/profile/models';

import * as fromActions from '../../actions/profile/licensure.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { licensureQuery } from '../../selectors/profile/licensure.selectors';

@Injectable({providedIn: 'any'})
export class LicensureFacade {
  allLicensure$ = this.store.pipe(select(licensureQuery.getAllLicensure));
  licensure$ = this.store.pipe(select(licensureQuery.licensure));
  selectedLicensure$ = this.store.pipe(select(licensureQuery.getSelectedLicensure));
  loading$ = this.store.pipe(select(licensureQuery.isLicensureLoading));
  saving$ = this.store.pipe(select(licensureQuery.isLicensureSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }

  getSelectedLicensure(id: string) {
    return this.store.pipe(select(licensureQuery.getSelectedLicensure(id)));
  }

  updateLicensure(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateLicensure({ id: profileId, payload: patch }));
  }

  addLicensure(entity: Licensure) {
    this.store.dispatch(fromActions.AddLicensure({ payload: entity }));
  }

  deleteLicensure(id) {
    this.store.dispatch(fromActions.DeleteLicensure({ id: id }));
  }
}
