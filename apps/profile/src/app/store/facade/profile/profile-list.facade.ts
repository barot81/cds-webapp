import { Injectable } from '@angular/core';
import { ProfileList } from '@exxat/profile/models';
import { select, Store } from '@ngrx/store';

import * as fromActions from '../../actions/profile/profile-list.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { profileListQuery } from '../../selectors/profile/profile-list.selectors';


@Injectable({providedIn: 'any'})
export class ProfileListFacade {
  allProfileList$ = this.store.pipe(select(profileListQuery.getAllProfileList));
  profileList$ = this.store.pipe(select(profileListQuery.profileList));
  selectedProfile$ = this.store.pipe(select(profileListQuery.selectedProfile));
  loading$ = this.store.pipe(select(profileListQuery.isProfileListLoading));
  saving$ = this.store.pipe(select(profileListQuery.isProfileListSaving));
  count$ = this.store.pipe(select(profileListQuery.count));

  constructor(private readonly store: Store<StudentProfileAppState>) { }

  getSelectedProfile(id: string) {
    return this.store.pipe(select(profileListQuery.getSelectedProfile(id)));
  }

  getProfileList(requestPayload: any) {
    this.store.dispatch(
      fromActions.LoadProfileList({ payload: requestPayload })
    );
  }

  profileListDistroy() {
    this.store.dispatch(fromActions.DistroyProfileList());
  }

  patchProfileList(datasourceDataPatch: ProfileList) {
    this.store.dispatch(
      fromActions.PatchProfileList({ payload: datasourceDataPatch })
    );
  }

  profileListLoaded(datasourceDataPatch: ProfileList) {
    this.store.dispatch(
      fromActions.ProfileListLoaded({ payload: datasourceDataPatch })
    );
  }
}
