import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { FeatureFlagService } from './feature-flag.service';

@Injectable({ providedIn: 'any' })
export class FeatureFlagGuardService implements CanActivate {
  constructor(
    private featureFlagService: FeatureFlagService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    const rules = route.data['rules'];
    if (rules) {
      this.featureFlagService.applyRules(rules).then((result) => {
        if (result) return true;
        else if (route.data['fallbackRoute']) {
          this._router.navigateByUrl(route.data['fallbackRoute']);
          return false;
        } else return false;
      });
    }
    return true;
  }
}
