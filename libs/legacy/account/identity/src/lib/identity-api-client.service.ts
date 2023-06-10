import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import {
  Body,
  POST,
  HttpService,

} from '@zhealthcare/fusion/core';
import { EmailOTPModel } from './components/forgot-password/EmailOTPModel';
import { ChangePassword } from '@zhealthcare/ux';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SSOFormData } from './components/sso/models/formdata.model';




@Injectable({providedIn: 'any'})
export class IdentityApiClient extends HttpService {

  config;
  profileInfo = {
    ProfileUrl: undefined,
    initials: true,
    fileCollectionKey: undefined,
    loading: true

  };
  ProfilePictureSubject = new BehaviorSubject(this.profileInfo);


  constructor() {
    super();
    this.config = this.configService.appSettings.auth.endpoint;
  }



  getBaseUrl(): string {
    return this.config;
  }

  @POST("/Password/SendOTP",null)
  public sendOTP(@Body emailOTPModel: EmailOTPModel): Observable<any> {
    return null;
  }

  @POST("/Password/VerifyOTP",null)
  public verifyOTP(@Body emailOTPModel: EmailOTPModel): Observable<{isOTPVerified:boolean,userOTPAttempts:number}> {
    return null;
  }

  @POST("/Password/ResetPassword",null)
  public resetPassword(@Body emailOTPModel: EmailOTPModel): Observable<boolean> {
    return null;
  }

  @POST("/Password/VerifyPassword",null)
  public verifyPassword(@Body changePassword: ChangePassword): Observable<boolean> {
    return null;
  }

  @POST("/Password/ChangePassword",null)
  public changePassword(@Body changePassword: ChangePassword): Observable<boolean> {
    return null;
  }

  public getTokenFromRefreshHash(refreshHash: string):Observable<any>{
    return of({});
  }

  redirectToV3() {
    return of({});
  }

  public getProviders(username: string): Observable<any> {
    return of({});
  }

  //@GET("/Request/SSOService")
  public getSAMLAuthRequest(providerName: string, userName: string, redirectUrl: string): Observable<SSOFormData>{
    return this.httpClient.get(this.getBaseUrl() + "/Request/SSOService?providerName="+providerName+"&userName="+userName+"&redirectUrl="+redirectUrl).pipe(map((res: SSOFormData)=>
    {
      return res;
    }));
  }

  getSAMLAuthResponse(responseKey: string): Observable<any> {
    return this.httpClient.get(this.getBaseUrl() + "/Response/AssertionConsumerService?responseKey="+responseKey);
  }
}
