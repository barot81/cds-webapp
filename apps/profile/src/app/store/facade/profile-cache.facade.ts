import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { getParamsFromRouteState, RouterStateUrl } from '@exxat/ux';

import * as fromActions from '../actions/profile-cache.actions';
import { StudentProfileAppState } from '../reducers/profile.reducers';

@Injectable({providedIn: 'any'})
export class ProfileCacheFacade {


  constructor(
    private readonly store: Store<StudentProfileAppState>
  ) {
  }

  initializeProfileCache() {
    this.store.dispatch(fromActions.InitializeProfileCache());
  }
}
