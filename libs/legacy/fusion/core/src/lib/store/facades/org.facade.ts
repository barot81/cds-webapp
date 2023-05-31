import {
    AppState,
    getOrgState,
    getSelectedFacility,
    getSelectedStatus,
  } from './../selectors/app.states';

  import { Injectable } from '@angular/core';
  import { Store } from '@ngrx/store';
  import { Observable } from 'rxjs';


  import {
    AccessedOuCode,
    FacilityWiseStatuses,
    StatusCount,
  } from '@zhealthcare/fusion/models';
  import { distinctUntilChanged } from 'rxjs/operators';
  import { OrgState } from '../reducers/org.reducers';
import { GetFacilityWiseStatuses, SetFacilityName, SetFacilityWithStatuses, SetStatusCount, UpdateFacilityWiseStatuses } from '../actions/org.actions';

  @Injectable({ providedIn: 'any' })
  export class OrgFacade {
    OrgState$: Observable<OrgState>;
    selectedFacilityId$: Observable<string>;
    selectedStatus$: Observable<string>;
    constructor(public appState$: Store<AppState>) {
      this.OrgState$ = this.appState$.select(getOrgState);
      this.selectedFacilityId$ = this.appState$
        .select(getSelectedFacility)
        .pipe(distinctUntilChanged());
      this.selectedStatus$ = this.appState$
        .select(getSelectedStatus)
        .pipe(distinctUntilChanged());
    }

    SetFacilityWiseStatuses(payload: FacilityWiseStatuses) {
      this.appState$.dispatch(new SetFacilityWithStatuses(payload));
    }

    UpdateFacilityWiseStatuses(payload: FacilityWiseStatuses) {
      this.appState$.dispatch(new UpdateFacilityWiseStatuses(payload));
    }

    GetFacilityWiseStatuses() {
      this.appState$.dispatch(new GetFacilityWiseStatuses());
    }

    SetFacilityName(payload: string) {
      this.appState$.dispatch(new SetFacilityName(payload));
    }

    SetStatusCount(payload: StatusCount[]) {
      this.appState$.dispatch(new SetStatusCount(payload));
    }
  }
