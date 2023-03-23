import { Injectable } from '@angular/core';
import { TokenModel, TokenSessionInfo } from '@zhealthcare/fusion/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUserActions from '../actions/user.actions';
import { UserState } from '../reducers/user.reducers';
import {
  AppState,
  getAuthState,
  getTokenExpiration,
  getUserState,
  isUserLoaded,
} from './../selectors/app.states';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  public UserState$: Observable<UserState> = this.appState$.pipe(
    select(getUserState)
  );
  public AuthState$: Observable<TokenModel> = this.appState$.pipe(
    select(getAuthState)
  );

  public TokenSessionInfo$: Observable<TokenSessionInfo> = this.appState$.pipe(
    select(getTokenExpiration)
  );

  public isUserLoaded$: Observable<boolean> = this.appState$.pipe(
    select(isUserLoaded)
  );
  constructor(private readonly appState$: Store<AppState>) {}

  Login(payload: any) {
    this.appState$.dispatch(new fromUserActions.Login(payload));
  }

  LoginWithRefreshToken(payload: any) {
    this.appState$.dispatch(new fromUserActions.LoginWithRefreshToken(payload));
  }

  AzureLogin() {
    this.appState$.dispatch(new fromUserActions.AzureLogin());
  }

  LoginSuccess(payload: any) {
    this.appState$.dispatch(new fromUserActions.LoginSuccess(payload));
  }

  DelegateLoginSuccess(payload: any) {
    this.appState$.dispatch(new fromUserActions.DelegateLoginSuccess(payload));
  }

  LoginFailure(payload: any) {
    this.appState$.dispatch(new fromUserActions.LoginFailure(payload));
  }

  SignUp(payload: any) {
    this.appState$.dispatch(new fromUserActions.SignUp(payload));
  }

  SignUpSuccess(payload: any) {
    this.appState$.dispatch(new fromUserActions.SignUpSuccess(payload));
  }

  updateUser() {
    this.appState$.dispatch(new fromUserActions.UpdateUser());
  }

  updateUserSuccess(payload: any) {
    this.appState$.dispatch(new fromUserActions.UpdateUserSuccess(payload));
  }

  SignUpFailure(payload: any) {
    this.appState$.dispatch(new fromUserActions.SignUpFailure(payload));
  }

  LoadUser(payload: any) {
    this.appState$.dispatch(new fromUserActions.LoadUser(payload));
  }

  setTokenSessionInfo(payload: TokenSessionInfo) {
    this.appState$.dispatch(new fromUserActions.SetTokenSessionInfo(payload));
  }

  updateUserLastActivityTime() {
    this.appState$.dispatch(new fromUserActions.UpdateUserLastActivityTime());
  }
  autoRenewToken(refreshToken: string) {
    this.appState$.dispatch(new fromUserActions.AutoRenewToken(refreshToken));
  }

  LogOut() {
    // Commented this code in consensus with Vinay for now as it is causing screen freezing on log out from Placement pages on Prod.
    //Logger.trace(`Logout Stacktrace - ${new Error().stack}`);
    //setTimeout(() => {
    this.appState$.dispatch(new fromUserActions.Logout());
    //}, 500);
  }

  AzureLogout() {
    this.appState$.dispatch(new fromUserActions.AzureLogout());
  }
}
