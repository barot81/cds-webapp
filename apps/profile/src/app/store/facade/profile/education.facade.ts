import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Education } from '@exxat/profile/models';

import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { educationQuery } from '../../selectors/profile/education.selectors';
import * as fromActions from '../../actions/profile/education.actions';

@Injectable({providedIn: 'any'})
export class EducationFacade {
  allEducation$ = this.store.pipe(select(educationQuery.getAllEducation));
  education$ = this.store.pipe(select(educationQuery.education));
  selectedEducation$ = this.store.pipe(select(educationQuery.getSelectedEducation));
  loading$ = this.store.pipe(select(educationQuery.isEducationLoading));
  saving$ = this.store.pipe(select(educationQuery.isEducationSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>
  ) { }


  getSelectedEducation(id: string) {
    return this.store.pipe(select(educationQuery.getSelectedEducation(id)));
  }

  updateEducation(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateEducation ({ id: profileId, payload: patch }));
  }

  addEducation(entity: Education) {
    this.store.dispatch(fromActions.AddEducation({ payload: entity }));
  }

  deleteEducation(id) {
    this.store.dispatch(fromActions.DeleteEducation({ id: id }));
  }
}
