import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Params } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { routeStateQuery } from '../selectors/router.selectors';
import { RouterStateUrl } from '../reducers/router.reducers';

@Injectable({ providedIn: 'any' })
export class RouterStateFacade implements OnDestroy {
  private _unsubscribe: Subject<any>;
  routeParams$ = this.store.pipe(
    select(routeStateQuery.getParamsFromRouteState)
  );
  getQueryParamsFromRouteState$ = this.store.pipe(
    select(routeStateQuery.getQueryParamsFromRouteState)
  );
  routeURL$ = this.store.pipe(select(routeStateQuery.getActiveRouteURL));
  routerState$ = this.store.pipe(select(routeStateQuery.getRouteState));

  constructor(private store: Store<RouterStateUrl>) {
    this._unsubscribe = new Subject();
  }

  getActiveRouteURL() {
    return this.store.pipe(select(routeStateQuery.getActiveRouteURL));
  }

  getRouteState(): Promise<Params> {
    return new Promise((resolve, reject) => {
      this.routerState$
        .pipe(takeUntil(this._unsubscribe))
        .subscribe((params) => {
          resolve(params?.state);
        });
    });
  }

  getRouteQueryParams(): Promise<Params> {
    return new Promise((resolve, reject) => {
      this.getQueryParamsFromRouteState$
        .pipe(takeUntil(this._unsubscribe))
        .subscribe((queryParams) => {
          resolve(queryParams);
        });
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
