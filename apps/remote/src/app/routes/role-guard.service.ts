import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MsalAuthService } from '@zhealthcare/fusion/services';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  clientId: string;
  groupMapping: {[key:string]:string};
  constructor(
   private msalAuthService: MsalAuthService,
   private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.msalAuthService.getGroupsFromToken()
      .then((userRoles) => {
        if(!userRoles)
          return false;

        const requiredGroups = next.data.groups;
        if (this.msalAuthService.checkUserAccess(userRoles, requiredGroups)) {
          return true;
        } else {
          this.router.navigate(['/not-found']);
          return false;
        }
      });
  }
}
