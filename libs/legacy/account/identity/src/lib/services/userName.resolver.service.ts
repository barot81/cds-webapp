import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class UserNameResolver implements Resolve<string>{

  userName:string;
  resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
    return this.userName;
  }

}
