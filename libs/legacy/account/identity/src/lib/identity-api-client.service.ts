import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  Body,
  POST,
  HttpService,
  Query

} from '@zhealthcare/fusion/core';
import { EmailOTPModel } from './components/forgot-password/EmailOTPModel';
import { ChangePassword } from '@zhealthcare/ux';
import { HttpHeaders } from '@angular/common/http';
import { LoginProvider } from './components/sso/models/login-provider.model';
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
    var headers = new HttpHeaders();
    headers = headers.append("refreshHash", refreshHash);
    return this.httpClient.get(this.getBaseUrl() + "/Account/V4Redirector", {headers: headers});
  }

  redirectToV3() {
    var auth = localStorage.getItem("Auth");
    var header = new HttpHeaders();
    header = header.append("Authorization","Bearer "+JSON.parse(auth).accessToken);
    return this.httpClient.get(this.configService.getservice('v3.account').endpoint, {headers: header, observe: "response", withCredentials: true});
  }

  public getProviders(username: string): Observable<any> {
    return this.httpClient.get(this.getBaseUrl() + "/account/GetUserAccount?username="+username).pipe(map((res: LoginProvider[]) => {return res;}));
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
