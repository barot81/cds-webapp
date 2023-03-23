import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, fromEvent } from 'rxjs';
import { tap, map, switchMap, catchError, filter } from 'rxjs/operators';

import {
  TokenModel,
  TokenSessionInfo,
  UserInputModel,
} from '@zhealthcare/fusion/models';
import { AuthService } from './../../services/auth/auth.service';
import {
  LoggingService,
  PasswordStrengthService,
  RoleService,
} from './../../services/index';
import {
  UserActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  UpdateUserSuccess,
  AzureLogin,
  Logout,
  LoginWithRefreshTokenSuccess,
  DelegateLoginSuccess,
  AutoRenewToken,
  DelegatorLogout,
  UpdateAuthTokenOnStorageChange,
} from '../actions/user.actions';
import {
  OrgActionTypes,
  LaunchSuccess,
  LaunchFailure,
  SetTenantWithOucodes,
  UpdateTenantWithOucodes,
} from '../actions/org.actions';
import { UserFacade } from '../facades/user.facade';
import { MsalService } from '../../services/auth/msal.service';
import { UserService } from '../../services/auth/user.service';
import { FusionConfigService } from '../../configuration/fusion-config.service';
import { HttpResponseHandler } from '../../asyncServices/http';
import { Logger } from '../../services/logger/logger.extension';
import { MatDialog } from '@angular/material/dialog';
import { TokenHelper } from '../../helper/token/token.helper';
import { MetaConstants, TokenConstants } from '../../helper/constants';
import { SessionLoggedoutDialogComponent } from '../../component/session-timeout/session-loggedout-dialog/session-loggedout-dialog.component';
import { AppStateHelper } from '../../helper/app-state/app-state.helper';

@Injectable({providedIn: 'any'})
export class AuthEffects {
  private lastLogintime: any;
  private tokenModel: TokenModel;
  private readonly launchUrl: string;
  private readonly loginUrl: string;
  private userInputModel: UserInputModel;
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly msalService: MsalService,
    private readonly userFacade$: UserFacade,
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly config: FusionConfigService,
    private readonly passwordStrengthService: PasswordStrengthService,
    private readonly httpResponseService: HttpResponseHandler,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly roleService: RoleService
  ) {
    this.launchUrl = this.config.get('authGuardSettings')?.launchUrl;
    this.loginUrl = this.config.get('authGuardSettings')?.loginUrl;
  }


  // init$: Observable<Action> = createEffect(() => defer(() => {
  //   this.userFacade$.AuthState$.pipe(
  //     map((authdata) => {
  //       if (authdata) {
  //         return { user: this.userFacade$.UserState$, auth: authdata };
  //       }
  //       return null;
  //     }),
  //     switchMap((payload) => {
  //       if (payload === null) {
  //         return of(new LoginFailure());
  //       }

  //       const state = {
  //         auth: payload.auth,
  //         user: payload.user,
  //       };
  //       return of(new Login(state));
  //     }),
  //     catchError((errorData) => {
  //       return of(
  //         new LoginFailure({
  //           status: errorData.status,
  //           statusText: errorData.statusText,
  //           error: errorData.error,
  //         })
  //       );
  //     })
  //   );
  // }));


  Login: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.LogIn),
    map((action: Login) => action.payload),
    switchMap((payload: any) => {
      return this.authService.login(payload).pipe(
        map((response: TokenModel) => {
          this.userInputModel = payload;
          const data: { tokenData: any; userData: any; tokenSessionInfo: any } =
            this.handleTokenExpiration(response);
          if (data.tokenData !== undefined) {
            localStorage.setItem('user.consent.loading', 'true');
            return new LoginSuccess({
              auth: response,
              user: data.userData,
              tokenSessionInfo: data.tokenSessionInfo,
              targetUrl: this.authService.redirectUrl,
            });
          }
          return null;
        }),
        catchError((errorData, source) => {
          this.httpResponseService.onCatch(errorData, source);
          return of(
            new LoginFailure({
              status: errorData.status,
              statusText: errorData.statusText,
              error: errorData.error,
            })
          );
        })
      );
    })
  ));


  AzureLogin: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.AzureLogin),
    map((action: AzureLogin) => action),
    tap(() => {
      this.msalService.login();
    })
  ), { dispatch: false });


  LoginSuccess: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.LogInSuccess),
    tap((data: LoginSuccess) => {
      const token: TokenModel = data.payload.auth;
      localStorage.setItem('Auth', JSON.stringify(token));
      localStorage.setItem(MetaConstants.USER_LOCAL_STORAGE_KEY, JSON.stringify(data.payload.user));
      sessionStorage.setItem(MetaConstants.USER_LOCAL_STORAGE_KEY, JSON.stringify(data.payload.user));
      localStorage.setItem('CurrentLoginTime', JSON.stringify(new Date()));
      localStorage.setItem('LastLoginTime', data.payload.user?.LastLoginTime);
      localStorage.setItem('identity.token.renew.request', 'Completed');
      localStorage.setItem(
        'tokenSessionInfo',
        JSON.stringify(data.payload.tokenSessionInfo)
      );
      LoggingService.setUserName(data.payload.user.UserName);

      if (data.payload.auth) {
        let isPasswordStrong: boolean;
        if (
          data.payload.user.UserName.toLowerCase().endsWith('.anonymous') ||
          data.payload.user.isSSOUser
        ) {
          Logger.trace(
            `User Effect  => LoginSuccess effect => Bypass Passowrd strength check for Delegator and SSO user => User Info: ${JSON.stringify(
              data?.payload?.user
            )} | current Token: ${JSON.stringify(token)} | active Route:${this.route?.url
            }`
          );
          isPasswordStrong = true;
        } else {
          isPasswordStrong = this.passwordStrengthService.isPasswordStrong(
            this.userInputModel?.password
          );
          if (
            this.userInputModel?.password === null ||
            this.userInputModel?.password === undefined
          ) {
            Logger.trace(
              `Password Strength Service => IsPasswordStrong => Password is undefined => userName : ${this.userInputModel?.userName}`
            );
          }
        }
        this.authService.setUserInfo(
          data.payload.user.FirstName,
          data.payload.user.LastName,
          data.payload.user.UserName,
          this.userInputModel?.password,
          isPasswordStrong
        );
      }
      localStorage.removeItem('user.consent.loading');
      localStorage.setItem('scheduledDowntime.showBanner', 'true');
    }),
    catchError((error) => {
      console.log(error);
      LoggingService.clearUserName();
      Logger.error(
        `User Effect  => LoginSuccess effect Failue => error : ${error} | active Route:${this.route?.url}`
      );

      return of(new LaunchFailure({ error: error }));
    })
  ), { dispatch: false });


  LoginWithRefreshToken: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.LoginWithRefreshToken),
    map((action: Login) => action.payload),
    switchMap((payload: any) => {
      const newPayload = {
        ...payload,
        grantType: 'refresh_token'
      };
      const oldRefreshToken = payload.refreshToken;
      return this.authService.login(newPayload)
        .pipe(
          map((response: TokenModel) => {
            this.userInputModel = newPayload;
            const data: { tokenData, userData, tokenSessionInfo } = this.handleTokenExpiration(response);
            this.authService.removeOldToken(oldRefreshToken).subscribe(() => {
              window.location.reload();
            });
            if (data.tokenData !== undefined) {
              return new LoginWithRefreshTokenSuccess({
                auth: response,
                user: data.userData,
                tokenSessionInfo: { ...data.tokenSessionInfo, isAutoRenewCall: true },
                targetUrl: this.authService.redirectUrl
              });
            }
            return null;
          }),
          catchError((errorData, source) => {
            this.httpResponseService.onCatch(errorData, source);
            return of(new LoginFailure({ status: errorData.status, statusText: errorData.statusText, error: errorData.error }));
          }))
    })));


  LoginWithRefreshTokenSuccess: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.LoginWithRefreshTokenSuccess),
    tap((data: LoginWithRefreshTokenSuccess) => {
      const token: TokenModel = data.payload.auth;
      localStorage.setItem('Auth', JSON.stringify(token));
      localStorage.setItem('identity.token.renew.request', 'Completed');
      if (!localStorage.getItem(MetaConstants.USER_LOCAL_STORAGE_KEY)) {
        localStorage.setItem(MetaConstants.USER_LOCAL_STORAGE_KEY, JSON.stringify(data.payload.user));
      }
      if (!sessionStorage.getItem(MetaConstants.USER_LOCAL_STORAGE_KEY)) {
        sessionStorage.setItem(MetaConstants.USER_LOCAL_STORAGE_KEY, JSON.stringify(data.payload.user));
      }
      localStorage.setItem(
        'tokenSessionInfo',
        JSON.stringify(
          data.payload.tokenSessionInfo
            ? data.payload.tokenSessionInfo
            : new TokenSessionInfo(0, 0)
        )
      );
      if (data.payload.auth) {
        this.authService.setUserInfo(
          data.payload.user.FirstName,
          data.payload.user.LastName,
          data.payload.user.UserName,
          this.userInputModel?.password,
          true
        );
      }
    }),
    catchError((error) => {
      LoggingService.clearUserName();
      Logger.error(
        `User Effect  => LoginSuccess effect Failue => error : ${error} | active Route:${this.route?.url}`
      );
      return of(new LaunchFailure({ error: error }));
    })
  ), { dispatch: false });


  AutoRenewToken: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.AutoRenewToken),
    map((action: AutoRenewToken) => action.payload),
    switchMap((payload: any) => {
      return this.authService.autoRenewToken(payload).pipe(
        map((response: TokenModel) => {
          this.userInputModel = payload;
          const oldRefreshToken = response.refreshToken;
          setTimeout(() => {
            this.authService.removeOldToken(oldRefreshToken).subscribe();
          }, TokenHelper.OldTokenDeactivationTime);
          TokenHelper.enableAutoRenewFlag();
          localStorage.removeItem(
            TokenConstants.IS_AUTO_RENEW_INITIATED_IN_OTHER_TAB
          );
          const data: { tokenData: any; userData: any; tokenSessionInfo } =
            this.handleTokenExpiration(response);
          if (data.tokenData !== undefined) {
            return new LoginWithRefreshTokenSuccess({
              auth: response,
              user: data.userData,
              tokenSessionInfo: {
                ...data.tokenSessionInfo,
                isAutoRenewCall: true,
              },
            });
          }
          return null;
        }),
        catchError((errorData, source) => {
          this.httpResponseService.onCatch(errorData, source);
          return of(
            new LoginFailure({
              status: errorData.status,
              statusText: errorData.statusText,
              error: errorData.error,
            })
          );
        })
      );
    })
  ));

  private handleTokenExpiration(tokenModel) {
    const tokenData = this.authService.parseJwtToken(tokenModel.accessToken);
    let userData = JSON.parse(
      tokenData[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'
      ]
    );
    const tokenSessionInfo = AppStateHelper.generateTokenSessionInfo({
      ...userData,
      Token: tokenData,
    });
    return { tokenData, userData, tokenSessionInfo };
  }


  DelegateLoginSuccess: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.DelegateLogInSuccess),
    tap((data: DelegateLoginSuccess) => {
      const token: TokenModel = data.payload.auth;
      sessionStorage.setItem('user.consent.consentedAt', 'delegator');
      sessionStorage.setItem('CurrentLoginTime', JSON.stringify(new Date()));
      sessionStorage.setItem('Auth', JSON.stringify(token));
      sessionStorage.setItem('identity.token.renew.request', 'Completed');
      sessionStorage.setItem('User', JSON.stringify(data.payload.user));
      sessionStorage.setItem('LastLoginTime', data.payload.user?.LastLoginTime);
      sessionStorage.setItem('IsDelegateUser', 'true');
      const userTokenInfo: { tokenData: any; userData: any; tokenSessionInfo } =
        this.handleTokenExpiration(token);
      sessionStorage.setItem(
        'tokenSessionInfo',
        JSON.stringify(
          !!userTokenInfo.tokenSessionInfo
            ? userTokenInfo.tokenSessionInfo
            : new TokenSessionInfo(0, 0)
        )
      );
      LoggingService.setUserName(data.payload.user.UserName);
    }),
    catchError((error) => {
      console.log(error);
      LoggingService.clearUserName();
      return of(new LaunchFailure({ error: error }));
    })
  ), { dispatch: false });


  LoginFailure: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.LogInFailure)
  ), { dispatch: false });


  SignUp: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.SignUp),
    map((action: SignUp) => action.payload),
    switchMap((payload) => {
      return this.authService.signUp(payload.Email, payload.Password).pipe(
        map((auth) => {
          return new SignUpSuccess({ Token: auth, Email: payload.Email });
        }),
        catchError((error) => {
          return of(new SignUpFailure({ error: error }));
        })
      );
    })
  ));


  SignUpSuccess: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.SignUpSuccess),
    tap((user: any) => {
      localStorage.setItem('Auth', JSON.stringify(user.payload.Token));
      this.router.navigateByUrl('/');
    })
  ), { dispatch: false });


  SignUpFailure: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.SignUpFailure)
  ), { dispatch: false });


  public Logout: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.Logout),
    tap(() => {
      this.tokenModel = JSON.parse(localStorage.getItem('Auth'));
      this.lastLogintime = JSON.parse(localStorage.getItem('CurrentLoginTime'));
      localStorage.removeItem('Auth');
      localStorage.clear();
      sessionStorage.clear();
      LoggingService.clearUserName();
      this.roleService.clearItem();
    }),
    switchMap((_) => {
      let refreshToken;
      if (this.tokenModel != null) {
        refreshToken = this.tokenModel.refreshToken;
      } else {
        refreshToken = "";
      }
      return this.authService.Logout(refreshToken, this.lastLogintime);
    }),
    catchError((error, source) => {
      this.httpResponseService.onCatch(error, source);
      return of(new LoginFailure());
    })
  ), { dispatch: false });


  public AzureLogout: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.AzureLogout),
    tap(() => {
      this.msalService.logout();
      localStorage.clear();
      this.router.navigateByUrl(this.loginUrl);
    })
  ), { dispatch: false });


  public UpdateUser: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.UpdateUser),
    switchMap((_) => {
      const user = JSON.parse(localStorage.getItem('User'));
      //bellow two condition of user.id for ternery operator are not same please check the case sensitivity of id
      return this.userService
        .UpdateUser(
          +(user.Id === undefined ? user.id : user.Id),
          'Base',
          '1000'
        )
        .pipe(
          map((data) => {
            return new UpdateUserSuccess({ user: data });
          }),
          catchError((error) => {
            return of(new SignUpFailure({ error: error }));
          })
        );
    })
  ));


  public UpdateUserSuccess: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.UpdateUserSuccess),
    tap((data: any) => {
      localStorage.setItem(MetaConstants.USER_LOCAL_STORAGE_KEY, JSON.stringify(data.payload));
      sessionStorage.setItem(MetaConstants.USER_LOCAL_STORAGE_KEY, JSON.stringify(data.payload));
    })
  ), { dispatch: false });


  public LaunchSuccess: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(OrgActionTypes.LaunchSuccess),
    tap((data: LaunchSuccess) => {
      Logger.trace(
        `User Effect  => LaunchSuccess effect => Redirect to Launch Page  => Launch Info: ${data} |  active Route:${this.route?.url}`
      );

      this.router.navigateByUrl('/account/launch');
    })
  ), { dispatch: false });


  public LaunchFailure: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(OrgActionTypes.LaunchFailure)
  ), { dispatch: false });


  public SetTenantWithOucodes: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(OrgActionTypes.SetTenantWithOucodes),
    tap((data: SetTenantWithOucodes) => {
      localStorage.setItem('TenantId', data.payload.TenantId);
      localStorage.setItem('Oucodes', JSON.stringify(data.payload.OucodeTree));
      sessionStorage.setItem('TenantId', data.payload.TenantId);
      sessionStorage.setItem(
        'Oucodes',
        JSON.stringify(data.payload.OucodeTree)
      );
    })
  ), { dispatch: false });

  public UpdateTenantWithOucodes: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(OrgActionTypes.UpdateTenantWithOucodes),
    tap((data: UpdateTenantWithOucodes) => {
      sessionStorage.setItem('TenantId', data.payload.TenantId);
      sessionStorage.setItem(
        'Oucodes',
        JSON.stringify(data.payload.OucodeTree)
      );
    })
  ), { dispatch: false });


  public DelegatorLogout: Observable<any> = createEffect(() => this.actions.pipe(
    ofType(UserActionTypes.DelegatorLogout),
    tap(() => { })
  ), { dispatch: false });


  public onChange = createEffect(() => fromEvent<StorageEvent>(window, 'storage').pipe(
    filter((event) => event.key === 'Auth'),
    map((event) => {
      if (event.newValue == null) {
        Logger.trace(
          `User Effect  => On change sorage account Info. Call Logout Event. => event : ${event}`
        );
        const isDelegatorUser = sessionStorage.getItem('IsDelegateUser');
        if (!!isDelegatorUser && !!JSON.parse(isDelegatorUser)) {
          this.router.navigateByUrl('delegator/session-timeout');
          Logger.trace(
            'Logging out because anotehr tab is logged out for delegator User.'
          );
          return new DelegatorLogout();
        } else {
          Logger.trace('Logging out because anotehr tab is logged out.');
          window.location.href = 'account/login';
          this.dialog.open(SessionLoggedoutDialogComponent, {
            disableClose: true,
            width: '500px',
          });
          return new Logout();
        }
      } else {
        Logger.trace(
          'Update auth token on starage change event, so that all tabs are in sync.'
        );
        return new UpdateAuthTokenOnStorageChange(event.newValue);
      }
    }),
    catchError((error) => {
      Logger.trace(
        `on storage change event error. - error :${JSON.stringify(
          error
        )}, user: ${localStorage.getItem('user') || sessionStorage.getItem('user')
        }`
      );
      return of(error);
    })
  ));
}
