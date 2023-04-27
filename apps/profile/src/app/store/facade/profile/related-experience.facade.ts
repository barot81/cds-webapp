import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { RelatedExperience } from '@exxat/profile/models';

import { StudentProfileAppState } from '../../reducers/profile.reducers';
import { relatedExperienceQuery } from '../../selectors/profile/related-experience.selectors';
import * as fromActions from '../../actions/profile/related-experience.actions';

@Injectable({providedIn: 'any'})
export class RelatedExperienceFacade {
  allRelatedExperience$ = this.store.pipe(select(relatedExperienceQuery.getAllRelatedExperience));
  relatedExperience$ = this.store.pipe(select(relatedExperienceQuery.relatedExperience));
  selectedRelatedExperience$ = this.store.pipe(select(relatedExperienceQuery.getSelectedRelatedExperience));
  loading$ = this.store.pipe(select(relatedExperienceQuery.isRelatedExperienceLoading));
  saving$ = this.store.pipe(select(relatedExperienceQuery.isRelatedExperienceSaving));

  constructor(
    private readonly store: Store<StudentProfileAppState>
  ) { }


  getSelectedRelatedExperience(id: string) {
    return this.store.pipe(select(relatedExperienceQuery.getSelectedRelatedExperience(id)));
  }

  updateRelatedExperience(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateRelatedExperience({ id: profileId, payload: patch }));
  }

  addRelatedExperience(entity: RelatedExperience) {
    this.store.dispatch(fromActions.AddRelatedExperience({ payload: entity }));
  }

  deleteRelatedExperience(id) {
    this.store.dispatch(fromActions.DeleteRelatedExperience({ id: id }));
  }
}
