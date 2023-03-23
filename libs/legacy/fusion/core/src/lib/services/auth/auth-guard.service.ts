import { UserFacade } from './../../store/facades/user.facade';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { FusionConfigService } from '../../configuration/fusion-config.service';
import { MetaConstants, URLConstants } from '../../helper/constants';
import { Logger } from '../logger/logger.extension';

@Injectable({ providedIn: 'any' })
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    private readonly userfacade: UserFacade,
    private readonly config: FusionConfigService
  ) {
    this.routes = this.config.get('authGuardSettings');
  }

  routes: any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = route.url.toString();
    this.auth.redirectUrl = state.url;
    let result = false;
    if (localStorage.getItem('pwdChanged') === 'false') {
      this.router.navigateByUrl('account/changePassword');
      Logger.trace(
        `Auth guard Service => Redirect Change Password Route. current Route : ${url} | userInfo: ${JSON.stringify(
          this.auth?.userInfo
        )}`
      );
    }
    this.userfacade.AuthState$.subscribe((authData) => {
      if (
        !(sessionStorage.getItem(MetaConstants.IsDelegateUser) === 'true') &&
        (localStorage.getItem(MetaConstants.USER_CONSENT_LOCAL_STORAGE_KEY) ===
          null ||
          localStorage.getItem(MetaConstants.USER_CONSENT_LOCAL_STORAGE_KEY) ===
            undefined)
      ) {
        if (
          !!authData?.accessToken &&
          url !== 'UserConsent' &&
          localStorage.getItem('user.consent.loading') === null
        ) {
          this.router.navigateByUrl('UserConsent');
          Logger.trace(
            `Auth guard Service => Redirect to consent Page. current Route : ${url} | current access Token: ${authData?.accessToken}`
          );
        }
      } else if (
        sessionStorage.getItem(MetaConstants.IsDelegateUser) === 'true'
      ) {
        if (!authData?.accessToken && sessionStorage.getItem('Auth')) {
          Logger.trace('Navigating to delegator from auth-guard');
          this.router.navigateByUrl(
            URLConstants.DELEGATE_PATH +
              '?key=' +
              sessionStorage.getItem('NotificationKey')
          );
        }
        result = true;
      } else if (url === 'changePassword' && this.auth.isPasswordStrong()) {
        result = true;
      } else if (url === 'login' || url === 'signup') {
        if (!!authData?.accessToken) {
          this.router.navigateByUrl(this.routes.launchUrl);
          Logger.trace(
            `Auth guard Service => Already Logged in and Token is already exists. current Route : ${url} | current access Token: ${authData?.accessToken}`
          );
        }
        result = true;
      } else if (!authData?.accessToken) {
        this.config.uiSettings = {
          layout: {
            navbar: {
              hidden: true,
            },
            header: {
              hidden: true,
            },
            footer: {
              hidden: true,
            },
            sidepanel: {
              hidden: true,
            },
          },
        };
        window.location.href = 'account/login';
        Logger.trace(
          `Auth guard Service => Redirect to Login. Token is Invalid. current Route : ${url} | current access Token: ${authData?.accessToken}`
        );
        result = false;
      } else if (
        JSON.parse(sessionStorage.getItem(MetaConstants.USER_LOCAL_STORAGE_KEY))
          ?.ManagedUserAccount?.IsActive ||
        JSON.parse(localStorage.getItem(MetaConstants.USER_LOCAL_STORAGE_KEY))
          ?.ManagedUserAccount?.IsActive
      ) {
        //if admin is managing students account, admin pages should not be opened
        if (url === 'admin' || url.includes('account,launch')) {
          this.router.navigateByUrl(URLConstants.DASHBOARD_URL);
          Logger.trace(
            `Auth guard Service => Admin managing Student Account. current Route : ${url} | current access Token: ${authData?.accessToken}`
          );

          result = false;
        }
      }
      result = true;
    });
    return result;
  }
}
