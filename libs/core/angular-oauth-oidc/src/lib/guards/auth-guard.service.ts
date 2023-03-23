import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkAccess();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAccess(state);
  }

  private checkAccess(state?: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isDoneLoading$.pipe(
      filter((isDone) => isDone),
      switchMap((_) => this.authService.isAuthenticated$),
      tap(
        (isAuthenticated) =>
          isAuthenticated || this.authService.login(state?.url)
      )
    );
  }
}
