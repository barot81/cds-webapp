import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { StudentTag } from '@exxat/profile/models';

import * as fromActions from '../../actions/tag/student-tag.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { studentTagQuery } from '../../selectors/tag/student-tag.selectors';

@Injectable({providedIn: 'any'})
export class StudentTagFacade {
  allStudentTag$ = this.store.pipe(select(studentTagQuery.getAllStudentTag));
  studentTag$ = this.store.pipe(select(studentTagQuery.studentTag));
  selectedStudentTag$ = this.store.pipe(select(studentTagQuery.getSelectedStudentTag));
  loading$ = this.store.pipe(select(studentTagQuery.isStudentTagLoading));
  saving$ = this.store.pipe(select(studentTagQuery.isStudentTagSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }

  getSelectedStudentTag(id: string) {
    return this.store.pipe(select(studentTagQuery.getSelectedStudentTag(id)));
  }

  updateStudentTag(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateStudentTag({ id: profileId, payload: patch }));
  }

  updateRangeStudentTag(entity: StudentTag[]) {
    this.store.dispatch(fromActions.UpdateRangeStudentTag ({  payload: entity }));
  }

  addStudentTag(entity: StudentTag) {
    this.store.dispatch(fromActions.AddStudentTag({ payload: entity }));
  }

  deleteStudentTag(id) {
    this.store.dispatch(fromActions.DeleteStudentTag({ id: id }));
  }

  deleteRangeStudentTag(id) {
    this.store.dispatch(fromActions.DeleteRangeStudentTag ({ id: id }));
  }
}
