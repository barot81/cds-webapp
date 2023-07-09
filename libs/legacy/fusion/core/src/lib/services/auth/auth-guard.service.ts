import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'any' })
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (isAuthenticated) return true;
    this.router.navigateByUrl('/account/login');
    return false;
  }
}
