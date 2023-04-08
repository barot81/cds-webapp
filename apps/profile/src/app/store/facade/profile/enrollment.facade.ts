import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Enrollment } from '@exxat/profile/models';

import * as fromActions from '../../actions/profile/enrollment.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { enrollmentQuery } from '../../selectors';
type GUID = string & { isGuid: true };

@Injectable({providedIn: 'any'})
export class EnrollmentFacade {
  enrollment$ = this.store.pipe(select(enrollmentQuery.enrollment));
  Enrollment$ = this.store.pipe(select(enrollmentQuery.getEnrollment));
  loading$ = this.store.pipe(select(enrollmentQuery.isEnrollmentLoading));
  saving$ = this.store.pipe(select(enrollmentQuery.isEnrollmentSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }

  selectedEnrollment(id: string) {
    return this.store.pipe(select(enrollmentQuery.getSelectedEnrollment(id)));
  }
  updateEnrollment(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateEnrollment({ id: profileId, payload: patch }));
  }

  updateStudentNumber(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateStudentNumber({ id: profileId, payload: patch }));
  }

  addEnrollment(entity: Enrollment) {
    this.store.dispatch(fromActions.AddEnrollment({ payload: entity }));
  }

  deleteEnrollment(id) {
    this.store.dispatch(fromActions.DeleteEnrollment({ id: id }));
  }

  patchEnrollment(patch: any) {
    this.store.dispatch(fromActions.PatchEnrollment({ payload: patch }));
  }

  getEnrollmentsByCohortIdAndGroups(cohortId: string, groups: string[]){
    return this.store.pipe(select(enrollmentQuery.getEnrollmentsByCohortIdAndGroups(cohortId, groups)));
  }
}
