import {
    AppState,
    getLeafOucodeList,
    getOrgState,
    getSelectedTenant,
    getSelectedTenantName,
    getUserAccessedOuCodes,
    selectedOucode,
  } from './../selectors/app.states';
  
  import { Injectable } from '@angular/core';
  import { Store } from '@ngrx/store';
  import { Observable } from 'rxjs';
  
  import {
    GetTenantWithOucodes,
    SetOuCodeAccessTree,
    SetTenantName,
    SetTenantWithOucodes,
    UpdateTenantWithOucodes,
  } from '../actions/org.actions';
  
  import {
    AccessedOuCode,
    OuCodeAccessTree,
    TenantWithOuCodeTree,
  } from '@exxat/fusion/models';
  import { distinctUntilChanged } from 'rxjs/operators';
  import { OrgState } from '../reducers/org.reducers';
  
  @Injectable({ providedIn: 'any' })
  export class OrgFacade {
    OrgState$: Observable<OrgState>;
    selectedOucode$: Observable<OuCodeAccessTree>;
    selectedTenant$: Observable<string>;
    selectedTenantName$ : Observable<string>;
    userAccessedOucodes$: Observable<AccessedOuCode[]>;
    leafOucodeList$: Observable<AccessedOuCode[]>;
    constructor(public appState$: Store<AppState>) {
      this.OrgState$ = this.appState$.select(getOrgState);
      this.selectedOucode$ = this.appState$
        .select(selectedOucode)
        .pipe(distinctUntilChanged());
      this.selectedTenant$ = this.appState$
        .select(getSelectedTenant)
        .pipe(distinctUntilChanged());
      this.userAccessedOucodes$ = this.appState$
        .select(getUserAccessedOuCodes)
        .pipe(distinctUntilChanged());
      this.selectedTenantName$ = this.appState$
        .select(getSelectedTenantName)
        .pipe(distinctUntilChanged());
      this.leafOucodeList$ = this.appState$
        .select(getLeafOucodeList)
        .pipe(distinctUntilChanged());
    }
  
    SetTenantWithOucodes(payload: TenantWithOuCodeTree) {
      this.appState$.dispatch(new SetTenantWithOucodes(payload));
    }
  
    UpdateTenantWithOucodes(payload: TenantWithOuCodeTree) {
      this.appState$.dispatch(new UpdateTenantWithOucodes(payload));
    }
  
    GetTenantWithOucodes() {
      this.appState$.dispatch(new GetTenantWithOucodes());
    }
  
    SetTenantName(payload: string) {
      this.appState$.dispatch(new SetTenantName(payload));
    }
  
    SetOuCodeAccessTree(payload: OuCodeAccessTree[]) {
      this.appState$.dispatch(new SetOuCodeAccessTree(payload));
    }
  }
  