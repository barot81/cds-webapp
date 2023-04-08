import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { TagMaster } from '@exxat/profile/models';

import * as fromActions from '../../actions/tag/tag-master.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { tagMasterQuery } from '../../selectors/tag/tag-master.selectors';

@Injectable({providedIn:'any'})
export class TagMasterFacade {
  allTagMaster$ = this.store.pipe(select(tagMasterQuery.getAllTagMaster));
  tagMaster$ = this.store.pipe(select(tagMasterQuery.tagMaster));
  selectedTagMaster$ = this.store.pipe(select(tagMasterQuery.getSelectedTagMaster));
  loading$ = this.store.pipe(select(tagMasterQuery.isTagMasterLoading));
  saving$ = this.store.pipe(select(tagMasterQuery.isTagMasterSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }

  getSelectedTagMaster(id: string) {
    return this.store.pipe(select(tagMasterQuery.getSelectedTagMaster(id)));
  }

  getTagMaster(){
    this.store.dispatch(fromActions.LoadStudentTagMaster());
  }

  updateTagMaster(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateStudentTagMaster({ id: profileId, payload: patch }));
  }

  addTagMaster(entity: TagMaster) {
    this.store.dispatch(fromActions.AddStudentTagMaster({ payload: entity }));
  }

  deleteTagMaster(id) {
    this.store.dispatch(fromActions.DeleteStudentTagMaster({ id: id }));
  }
}
