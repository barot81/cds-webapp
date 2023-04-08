import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AboutMe } from '@exxat/profile/models';

import * as fromActions from '../../actions/profile/about-me.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';

type GUID = string & { isGuid: true };
import { aboutMeQuery } from '../../selectors/profile/about-me.selectors';

@Injectable({ providedIn: 'any'})
export class AboutMeFacade {
  AboutMe$ = this.store.pipe(select(aboutMeQuery.getAboutMe));
  SelectedAboutMe$ = this.store.pipe(select(aboutMeQuery.getSelectedAboutMe));
  loading$ = this.store.pipe(select(aboutMeQuery.isAboutMeLoading));
  saving$ = this.store.pipe(select(aboutMeQuery.isAboutMeSaving));
  aboutMe$ = this.store.pipe(select(aboutMeQuery.aboutMe));

  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }


  getAboutMe(id) {
    this.store.dispatch(fromActions.GetAboutMe(id));
  }

  selectedAboutMe(id: string) {
    return this.store.pipe(select(aboutMeQuery.getSelectedAboutMe(id)));
  }

  updateAboutMe(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateAboutMe({ id: profileId, payload: patch }));
  }

  updateResumeKey(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateResumeKey({ id: profileId, payload: patch }));
  }

  addAboutMe(entity: AboutMe) {
    this.store.dispatch(fromActions.AddAboutMe({ payload: entity }));
  }

  aboutMeLoaded(entity) {
    this.store.dispatch(fromActions.AboutMeLoaded({ payload: entity }));
  }

  updateAboutMeSuccess(data: any) {
    this.store.dispatch(fromActions.UpdateAboutMeSuccess({ payload: data }));
  }
}
