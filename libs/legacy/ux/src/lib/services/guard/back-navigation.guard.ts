/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { FusionNavigationService } from '@zhealthcare/fusion/services';
import { take } from 'rxjs/operators';
import { RouterStateFacade } from '../../store';

@Injectable({providedIn: 'any'})
export class BackNavigationGuard implements CanDeactivate<any> {
  /**
   *
   */
  constructor(
    private _navService: FusionNavigationService,
    private _routerStateFacade: RouterStateFacade
  ) {}

  canDeactivate(component: any) {
    let routeURL = null;
    this._routerStateFacade
      .getActiveRouteURL()
      .pipe(take(1))
      .subscribe((response) => {
        routeURL = response;
      });
    if (routeURL === '/account/login') return true;
    else {
      // will prevent user from going back
      if (this._navService.defendAgainstBrowserBackButton) {
        // push current state again to prevent further attempts.
        this._navService.setDefendAgainstBrowserBackButton(false);
        history.pushState(null, null, location.href);
        return false;
      }
      return true;
    }
  }
}
