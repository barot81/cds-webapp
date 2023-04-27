import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Membership } from '@exxat/profile/models';

import * as fromActions from '../../actions/profile/membership.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { membershipQuery } from '../../selectors/profile/membership.selectors';

@Injectable({providedIn: 'any'})
export class MembershipFacade {
  allMembership$ = this.store.pipe(select(membershipQuery.getAllMembership));
  membership$ = this.store.pipe(select(membershipQuery.membership));
  selectedMembership$ = this.store.pipe(select(membershipQuery.getSelectedMembership));
  loading$ = this.store.pipe(select(membershipQuery.isMembershipLoading));
  saving$ = this.store.pipe(select(membershipQuery.isMembershipSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }

  getSelectedMembership(id: string) {
    return this.store.pipe(select(membershipQuery.getSelectedMembership(id)));
  }

  updateMembership(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateMembership({ id: profileId, payload: patch }));
  }

  addMembership(entity: Membership) {
    this.store.dispatch(fromActions.AddMembership({ payload: entity }));
  }

  deleteMembership(id) {
    this.store.dispatch(fromActions.DeleteMembership({ id: id }));
  }
}
