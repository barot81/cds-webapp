import { Action } from '@ngrx/store';

export enum UserActionTypes {
  LogIn = '[Auth] Login',
  LoginWithRefreshToken = '[Auth] Login with refresh token',
  LoginWithRefreshTokenSuccess = '[Auth] Login with refresh token success',
  AzureLogin = '[Auth] Azure Login',
  LogInSuccess = '[Auth] Login Success',
  DelegateLogInSuccess = '[Auth] Delegate Login Success',
  LogInFailure = '[Auth] Login Failure',
  SignUp = '[Auth] Signup',
  SignUpSuccess = '[Auth] Signup Success',
  SignUpFailure = '[Auth] Signup Failure',
  Logout = '[Auth] Logout',
  DelegatorLogout = '[Auth] DelegatorLogout',
  AzureLogout = '[Auth] Azure Logout',
  LoadUser = '[Auth] Load User',
  UpdateUser = '[Auth] Update User',
  UpdateUserSuccess = '[Auth] Update UserSuccess',
  SetTokenSessionInfo = '[Auth Set Token Session information]',
  UpdateUserLastActivityTime = '[Auth update User Last Activity Time]',
  AutoRenewToken = '[Auth Auto Renew Token]',
  AutoRenewTokenSuccess = '[Auth Auto Renew Token Success]',
  UpdateAuthTokenOnStorageChange = '[Auth Update Token On Storage Value change]'
}

export class Login implements Action {
  readonly type = UserActionTypes.LogIn;
  constructor(public payload: any) {
  }
}

export class LoginWithRefreshToken implements Action {
  readonly type = UserActionTypes.LoginWithRefreshToken;
  constructor(public payload: any) {
  }
}


export class LoginWithRefreshTokenSuccess implements Action {
  readonly type = UserActionTypes.LoginWithRefreshTokenSuccess;
  constructor(public payload: any) {
  }
}

export class AzureLogin implements Action {
  readonly type = UserActionTypes.AzureLogin;
}

export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LogInSuccess;
  constructor(public payload: any) {}
}

export class DelegateLoginSuccess implements Action {
  readonly type = UserActionTypes.DelegateLogInSuccess;
  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = UserActionTypes.LogInFailure;
  constructor(public payload?: any) {}
}

export class SignUp implements Action {
  readonly type = UserActionTypes.SignUp;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = UserActionTypes.SignUpSuccess;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = UserActionTypes.SignUpFailure;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = UserActionTypes.Logout;
}

export class DelegatorLogout implements Action {
  readonly type = UserActionTypes.DelegatorLogout;
}

export class AzureLogout implements Action {
  readonly type = UserActionTypes.AzureLogout;
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;
  constructor(public payload: any) {}
}
export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;
}
export class UpdateUserSuccess implements Action {

  readonly type = UserActionTypes.UpdateUserSuccess;
  constructor(public payload: any) {}
}


export class SetTokenSessionInfo implements Action {
  readonly type = UserActionTypes.SetTokenSessionInfo;
  constructor(public payload: any) {}
}

export class AutoRenewToken implements Action {
  readonly type = UserActionTypes.AutoRenewToken;
  constructor(public payload: any) {}
}

export class AutoRenewTokenSuccess implements Action {
  readonly type = UserActionTypes.AutoRenewTokenSuccess;
  constructor(public payload: any) {}
}

export class UpdateUserLastActivityTime implements Action {
  readonly type = UserActionTypes.UpdateUserLastActivityTime;
  constructor(){}
}

export class UpdateAuthTokenOnStorageChange implements Action {
  readonly type = UserActionTypes.UpdateAuthTokenOnStorageChange;
  constructor(public payload: any) {}
}

export type UserActions =
  | Login
  | LoginWithRefreshToken
  | LoginWithRefreshTokenSuccess
  | AzureLogin
  | LoginSuccess
  | DelegateLoginSuccess
  | LoginFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | Logout
  | AzureLogout
  | LoadUser
  | UpdateUser
  | UpdateUserSuccess
  | SetTokenSessionInfo
  | AutoRenewToken
  | AutoRenewTokenSuccess
  | UpdateUserLastActivityTime
  | UpdateAuthTokenOnStorageChange;
