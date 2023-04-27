import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { WorkExperience } from '@exxat/profile/models';

import * as fromActions from '../../actions/profile/work-experience.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { workExperienceQuery } from '../../selectors/profile/work-experience.selectors';

@Injectable({providedIn: 'any'})
export class WorkExperienceFacade {
  allWorkExperience$ = this.store.pipe(select(workExperienceQuery.getAllWorkExperience));
  workExperience$ = this.store.pipe(select(workExperienceQuery.workExperience));
  selectedWorkexperience$ = this.store.pipe(select(workExperienceQuery.getSelectedWorkExperience));
  loading$ = this.store.pipe(select(workExperienceQuery.isWorkExperienceLoading));
  saving$ = this.store.pipe(select(workExperienceQuery.isWorkExperienceSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }

  getSelectedWorkexperience(id: string) {
    return this.store.pipe(select(workExperienceQuery.getSelectedWorkExperience(id)));
  }

  updateWorkExperience(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateWorkExperience({ id: profileId, payload: patch }));
  }

  addWorkExperience(entity: WorkExperience) {
    this.store.dispatch(fromActions.AddWorkExperience({ payload: entity }));
  }

  deleteWorkExperience(id) {
    this.store.dispatch(fromActions.DeleteWorkExperience({ id: id }));
  }
}
