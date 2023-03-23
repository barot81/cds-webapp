import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromTabActions from '../actions/page.actions';
import { pageQuery } from '../selectors/page.selctors';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { FusionNavigationService } from '@exxat/fusion/services';
import { NavigationItem } from '@exxat/fusion/models';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'any' })
export class PageFacade {
  private _unsubscribe: Subject<any>;
  pageTitle$ = this.store.pipe(select(pageQuery.getPageTitle));

  browserTitlePrefix: string = 'Exxat - ';
  constructor(
    private store: Store<PageFacade>,
    private titleService: Title,
    private fusionNavigationService: FusionNavigationService
  ) {
    this._unsubscribe = new Subject();
  }

  setPageTitle(pageTitle: string) {
    this.titleService.setTitle(this.browserTitlePrefix + pageTitle);
    this.store.dispatch(fromTabActions.setPageTitle({ pageTitle: pageTitle }));
  }

  setPageTitleByNavigationId(navigationId: string) {
    const pageTitle = (<NavigationItem>(
      this.fusionNavigationService.getNavigationItem(navigationId)
    )).title;
    this.titleService.setTitle(this.browserTitlePrefix + pageTitle);
    this.store.dispatch(
      fromTabActions.setPageTitleWithNavigationId({
        pageTitle: pageTitle,
        navigationId: navigationId,
      })
    );
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
