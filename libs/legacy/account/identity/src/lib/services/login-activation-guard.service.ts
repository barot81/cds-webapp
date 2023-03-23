import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginActivationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const ssoRedirectURI = localStorage.getItem('ssoLogoutRedirectURI');
    if (ssoRedirectURI) {
      this.router.navigateByUrl(ssoRedirectURI);
      return false;
    } else {
      return true;
    }
  }
}
