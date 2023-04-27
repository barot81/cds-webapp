import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Demographic } from '@exxat/profile/models';

import * as fromActions from '../../actions/profile/demographic.actions';
import { StudentProfileAppState } from '../../reducers/profile.reducers';
type GUID = string & { isGuid: true };
import { demographicQuery } from '../../selectors';

@Injectable({providedIn: 'any'})
export class DemographicFacade {
  Demographic$ = this.store.pipe(select(demographicQuery.getDemographic));
  loading$ = this.store.pipe(select(demographicQuery.isDemographicLoading));
  saving$ = this.store.pipe(select(demographicQuery.isDemographicSaving));
  demographic$ = this.store.pipe(select(demographicQuery.demographic));
  constructor(
    private readonly store: Store<StudentProfileAppState>,
  ) { }

  selectedDemographic(id: string) {
    return this.store.pipe(select(demographicQuery.getSelectedDemographic(id)));
  }
  updateDemogrphic(profileId, patch: any) {
    this.store.dispatch(fromActions.UpdateDemographic({ id: profileId, payload: patch }));
  }

  addDemogrphic(entity: Demographic) {
    this.store.dispatch(fromActions.AddDemographic({ payload: entity }));
  }

  demographicLoaded(entity) {
    this.store.dispatch(fromActions.DemographicLoaded({ payload: entity }));
  }
}
