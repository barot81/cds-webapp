import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Profile } from '@exxat/profile/models';

import * as fromActions from '../../actions/profile/personel-information.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { personelInformationQuery } from './../../selectors/profile/personel-information.selectors';
type GUID = string & { isGuid: true };

@Injectable({providedIn: 'any'})
export class PersonalInformationFacade {
   personalInformation$ = this.store.pipe(select(personelInformationQuery.personelInformation));
  loading$ = this.store.pipe(select(personelInformationQuery.isPersonelInformationLoading));
  saving$ = this.store.pipe(select(personelInformationQuery.isPersonelInformationSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }

  selectedPersonalInformation(id: string) {
    return this.store.pipe(select(personelInformationQuery.getSelectedPersonelinformation(id)));
  }

  updatePersonalInformation(id, patch: any) {
    this.store.dispatch(fromActions.UpdatePersonalInformation({ id: id, payload: patch }));
  }

  patchPersonalInformation(id, patch: any) {
    this.store.dispatch(fromActions.PatchPersonalInformation({ id: id, payload: patch }));
  }

  addPersonalInformation(entity: Profile) {
    this.store.dispatch(fromActions.AddPersonalInformation({ payload: entity }));
  }

  updatePersonalInformationSuccess(data: any){
    this.store.dispatch(fromActions.UpdatePersonalInformationSuccess({payload : data}));
}

}
