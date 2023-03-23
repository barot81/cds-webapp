import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Sandbox } from '@zhealthcare/fusion/core';
import { BehaviorSubject } from 'rxjs';

import { IdentityApiClient } from './identity-api-client.service';
import { EmailOTPModel } from './components/forgot-password/EmailOTPModel';
import { ChangePassword } from '@zhealthcare/ux';
import { TokenModel } from '@zhealthcare/fusion/models';
import { SSOFormData } from './components/sso/models/formdata.model';


@Injectable({providedIn: 'any'})
export class IdentitySandbox extends Sandbox {

  profileInfo = {
    ProfileUrl: undefined,
    fullname: undefined,
    fileCollectionKey: undefined,
    lodding: true

  };
  ProfilePictureSubject = new BehaviorSubject(this.profileInfo);
  owningUserUnit = "";
  config;
  constructor(
    private identityApiClient: IdentityApiClient,
  ) {
    super();

  }

  public sendOTP(emailOTPModel: EmailOTPModel): Observable<any> {
    return this.identityApiClient.sendOTP(emailOTPModel);
  }

  public verifyOTP(emailOTPModel: EmailOTPModel) {
    return this.identityApiClient.verifyOTP(emailOTPModel);
  }

  public resetPassword(emailOTPModel: EmailOTPModel) {
    return this.identityApiClient.resetPassword(emailOTPModel);
  }

  public getTokenFromRefreshHash(refreshHash: string):Observable<TokenModel>{
    return this.identityApiClient.getTokenFromRefreshHash(refreshHash);
  }

  public redirectToV3() {
    return this.identityApiClient.redirectToV3();
  }

  getProviders(input: any): Observable<any> {
    return this.identityApiClient.getProviders(input);
  }

  public getSAMLAuthRequest(providerName: string, userName: string, redirectUrl: string): Observable<SSOFormData> {
    return this.identityApiClient.getSAMLAuthRequest(providerName, userName, redirectUrl);
  }

  public getSAMLAuthResponse(responseKey: string): Observable<any>{
    return this.identityApiClient.getSAMLAuthResponse(responseKey);
  }

}
