import { TokenModel } from './token.model';
export class User {
  Id?: string;
  Email?: string;
  UserName?: string;
  UserRoles?: any[];
  Token?: TokenModel;
  ManagedUserAccount?: ManagedUserAccount;
  ReferenceKey?: string;
  firstName?: string;
  lastName?: string;
  FirstName?: string;
  LastName?: string;
  isSSOUser?: boolean = false;
}
export class ManagedUserAccount {
  Id?: string;
  Email?: string;
  Name?: string;
  IsActive?: boolean;
  CohortId?: string;
}

export class UserInputModel {
  constructor(
    public userName: string,
    public password?: string,
    public refreshToken?: string,
    public grantType = 'password'
  ) {}
}

export class UserRefreshTokenModel {
  constructor(
    public refreshToken: string,
    public grantType = 'refresh_token'
  ) {}
}
