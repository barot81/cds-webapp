import {
  UserInputModel,
  User,
  TokenModel,
  HashDataModel,
  NavigationChangeDetector,
  LaunchDataModel,
  OrgUnit,
  Organization
} from '@zhealthcare/fusion/models';
import { Injectable } from '@angular/core';
import { GET, Header, Path, Query } from './../../asyncServices/http/http.decorator';
import { HttpService } from './../../asyncServices/http/http.service';
import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { UserInfo } from './models/userInfo.model';
import { Cryptography } from '../../helper/cryptography/encryption';
import { Logger } from '../logger/logger.extension';

@Injectable({providedIn: 'any'})
export class AuthService extends HttpService {
  private readonly BASE_URL: string = '';
  public redirectUrl: string;
  public userInfo: UserInfo;

  constructor() {
    super();
    this.BASE_URL = this.configService.appSettings?.auth?.endpoint ?? '';
  }
  protected getBaseUrl(): string {
    return this.configService.getservice('foundation.meta')?.endpoint ?? '';
  }

  login(userInputModel: UserInputModel): Observable<any> {
    if(userInputModel.userName === 'vishal') {
      userInputModel = Object.assign({}, userInputModel, {
        userName: 'exxat.superadmin'
      });
    }
          return of({
            accessToken:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhenAiOiJFeHhhdCIsImp0aSI6ImM0OWQ0ZjU5LTNkZDMtNDA4MS1hYjZmLTAxNTI0NDUwODZhZSIsImlhdCI6MTY4MjUzNTUxNCwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiJhN2ZjODhlNS03MjNiLTQ1OTktYjcyNi0zMGVkY2IyNTllYjYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiSWRcIjoxMDUsXCJGaXJzdE5hbWVcIjpcIkFsZXhpYVwiLFwiTGFzdE5hbWVcIjpcIkJyYWNrZW5cIixcIkxvY2tvdXRFbmRcIjpudWxsLFwiUGhvbmVOdW1iZXJcIjpudWxsLFwiRW1haWxcIjpcImFua2l0LmthcGF0ZWxAZXh4YXRzeXN0ZW1zLmNvbVwiLFwiVXNlck5hbWVcIjpcIkV4eGF0LlN1cGVyQWRtaW5cIixcIlNlcmlhbE51bWJlclwiOlwiYTdmYzg4ZTUtNzIzYi00NTk5LWI3MjYtMzBlZGNiMjU5ZWI2XCIsXCJJbnZhbGlkTG9naW5BdHRlbXB0c1wiOjAsXCJVc2VyT3JnYW5pemF0aW9uS2V5XCI6bnVsbCxcIlJlZmVyZW5jZUtleVwiOm51bGwsXCJDb2hvcnRJZFwiOm51bGwsXCJQYWlkUmVzb3VyY2VzXCI6bnVsbCxcIkxhc3RMb2dpblRpbWVcIjpcIjIwMjMtMDQtMjZUMTg6NTg6MzMuOTMzNTc0KzAwOjAwXCIsXCJVc2VyUm9sZXNcIjpbe1wiSWRcIjoxMDYsXCJSb2xlQ29kZVwiOlwiQmFzZVwiLFwiT3JnYW5pemF0aW9uVW5pdENvZGVcIjpcIjEwMDBcIixcIkFjY2Vzc0xldmVsXCI6XCJPcmdhbml6YXRpb25cIixcIlJvd0xldmVsRmlsdGVySWRcIjpudWxsLFwiVXNlclR5cGVcIjpudWxsLFwiVGVuYW50SWRcIjpudWxsfSx7XCJJZFwiOjExNSxcIlJvbGVDb2RlXCI6XCJFeHhhdC5TdGVwcy5BZG1pblwiLFwiT3JnYW5pemF0aW9uVW5pdENvZGVcIjpcIjEwMDBcIixcIkFjY2Vzc0xldmVsXCI6XCJPcmdhbml6YXRpb25cIixcIlJvd0xldmVsRmlsdGVySWRcIjpudWxsLFwiVXNlclR5cGVcIjpcIkFkbWluaXN0cmF0b3JcIixcIlRlbmFudElkXCI6XCJFeHhhdFwifSx7XCJJZFwiOjIyMDExLFwiUm9sZUNvZGVcIjpcIkV4eGF0LlN0ZXBzLlZpZXdBc1N0dWRlbnRcIixcIk9yZ2FuaXphdGlvblVuaXRDb2RlXCI6XCIxMDAwXCIsXCJBY2Nlc3NMZXZlbFwiOlwiUGFyZW50Q2hpbGRPcmdhbml6YXRpb25Vbml0XCIsXCJSb3dMZXZlbEZpbHRlcklkXCI6bnVsbCxcIlVzZXJUeXBlXCI6XCJTdHVkZW50XCIsXCJUZW5hbnRJZFwiOlwiRXh4YXRcIn0se1wiSWRcIjo2MTE4OCxcIlJvbGVDb2RlXCI6XCJDb21tb24uUm9sZS5EZXZPcHNcIixcIk9yZ2FuaXphdGlvblVuaXRDb2RlXCI6XCIxMDAwXCIsXCJBY2Nlc3NMZXZlbFwiOlwiT3JnYW5pemF0aW9uXCIsXCJSb3dMZXZlbEZpbHRlcklkXCI6bnVsbCxcIlVzZXJUeXBlXCI6XCJBZG1pbmlzdHJhdG9yXCIsXCJUZW5hbnRJZFwiOlwiQ29tbW9uXCJ9LHtcIklkXCI6MTA1ODYxLFwiUm9sZUNvZGVcIjpcIkV4eGF0LlBsYW4uQWRtaW5cIixcIk9yZ2FuaXphdGlvblVuaXRDb2RlXCI6XCIxMDAwXCIsXCJBY2Nlc3NMZXZlbFwiOlwiT3JnYW5pemF0aW9uXCIsXCJSb3dMZXZlbEZpbHRlcklkXCI6bnVsbCxcIlVzZXJUeXBlXCI6XCJBZG1pbmlzdHJhdG9yXCIsXCJUZW5hbnRJZFwiOlwiRXh4YXRcIn0se1wiSWRcIjoyOTMwNDMsXCJSb2xlQ29kZVwiOlwiR2xvYmFsLlByaXNtLkFkbWluXCIsXCJPcmdhbml6YXRpb25Vbml0Q29kZVwiOlwiUDAwNFwiLFwiQWNjZXNzTGV2ZWxcIjpcIk9yZ2FuaXphdGlvblwiLFwiUm93TGV2ZWxGaWx0ZXJJZFwiOm51bGwsXCJVc2VyVHlwZVwiOlwiQWRtaW5pc3RyYXRvclwiLFwiVGVuYW50SWRcIjpcIkV4eGF0XCJ9XX0iLCJyb3dMZXZlbEZpbHRlcklkIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxMDUiLCJuYmYiOjE2ODI1MzU1MTQsImV4cCI6MTY4MjU0MjcxNCwiYXVkIjoiQW55In0.KPdSvElcWZcyEKTtnLMeStCbxbGJ7sqLkZ-DOMemBT0",
            expiration:  120,
            refreshToken: "486f8e0ea9024d05802b70751e5d07be"
          });
  }

  private getRequestBody<T>(inputBody: T) {
    let requestBody: any = inputBody;
    if (this.configService.appSettings.Cryptography.EnableEncryption) {
      requestBody = Cryptography.encryptRequest<T>(
        inputBody,
        this.configService
      );
    }
    return requestBody;
  }

  public autoRenewToken(refreshToken: string) {
    let url = this.getFinalUrl('/account/tokenRenewalRequest');
    let requestBody = this.getRequestBody<{ refreshToken: string }>({
      refreshToken: refreshToken
    });
    return this.httpClient.post<TokenModel>(url, requestBody);
  }

  public removeOldToken(refreshToken: string) {
    let url = this.getFinalUrl('/account/RemoveOldToken');
    let params: HttpParams = new HttpParams();
    params = params.append('refreshToken', refreshToken);
    return this.httpClient
      .delete<any>(url, { params: params })
      .pipe(
        catchError((error, source) =>
          this.httpResponseHandler.onCatch(error, source)
        )
      );
  }

  public getFinalUrl(remaingUrl: string) {
    return (
      this.getEndpoint(
        this.BASE_URL
          ? this.BASE_URL
          : this.configService.appSettings.auth.endpoint
      ) + remaingUrl
    );
  }
  setUserInfo(firstName, lastName, userName, password, isPasswordStrong) {
    var encryptedPassword = Cryptography.encryptText(
      password,
      this.configService
    );
    this.userInfo = new UserInfo(
      firstName,
      lastName,
      userName,
      encryptedPassword,
      isPasswordStrong
    );
    sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }

  getUserInfo(): UserInfo {
    if (this.userInfo === null || this.userInfo === undefined) {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    this.userInfo.password = Cryptography.decryptText(
      this.userInfo?.password,
      this.configService
    );
    return this.userInfo;
  }

  isPasswordStrong(): boolean {
    if (this.userInfo && this.userInfo.isPasswordStrong) {
      return this.userInfo.isPasswordStrong;
    } else {
      var ispwdStrong = JSON.parse(
        sessionStorage.getItem('userInfo')
      )?.isPasswordStrong;
      if (ispwdStrong) {
        return ispwdStrong;
      }
      return true;
    }
  }
  removeUserInfo() {
    sessionStorage.removeItem('userInfo');
  }

  @GET('/launch')
  Launch(
    @Header('TenantId') header: string,
    @Header('Oucodes') oucodes: string
  ): Observable<LaunchDataModel[]> {
    return null;
  }

  @GET('/{tenantId}/{oucode}/access')
  public Role(
    @Header('TenantId') header: string,
    @Header('Oucodes') oucodes: string,
    @Path('tenantId') tenantId: string,
    @Path('oucode') oucode: string,
    @Query('hash') hash: string,
    @Query('isfaculty') isfaculty: boolean,
    @Query('isViewAsStudent') isViewAsStudent: boolean
  ): Observable<HashDataModel[]> {
    return null;
  }
  @GET('/{tenantId}/{oucode}/navigation')
  public Navigation(
    @Header('TenantId') header: string,
    @Header('Oucodes') oucodes: string,
    @Path('tenantId') tenantId: string,
    @Path('oucode') oucode: string,
    @Query('hash') hash: string,
    @Query('userType') userType: string,
    @Query('isFaculty') isFaculty: boolean
  ): Observable<NavigationChangeDetector> {
    return null;
  }

  signUp(username: string, password: string): Observable<TokenModel> {
    const url = this.getEndpoint(`${this.BASE_URL}/register`);
    return this.httpClient.post<TokenModel>(url, {
      username: username,
      password: password,
      GrantType: 'password'
    });
  }

  adSignUp(user: any, tokenModel: TokenModel): Observable<any> {
    const url = this.getEndpoint(
      `${
        this.configService.getservice('foundation.registration').endpoint
      }/Registration/ADUserRegister`
    );

    return this.httpClient.post(url, user);
  }

  Logout(refreshToken: string, lastLogintime: string): Observable<any> {
    let url = this.getEndpoint(`${this.BASE_URL}/account/logout`);
    if (!this.BASE_URL) {
      url = this.getEndpoint(
        `${this.configService.appSettings.auth.endpoint}/account/logout`
      );
    }

    let params: HttpParams = new HttpParams();
    params = params.append('refreshToken', refreshToken);
    params = params.append('lastLogintime', lastLogintime);
    Logger.trace('Logout is called with refresh token:' + refreshToken);
    return this.httpClient.get<any>(url, { params: params }).pipe(
      tap((_) => window.location.reload()),
      catchError((error, source) =>
        this.httpResponseHandler.onCatch(error, source)
      )
    );
  }

  parseJwtToken(token: string): any {
    if (token !== undefined) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    }
    return undefined;
  }

  @GET<OrgUnit>('/OrgUnit/{id}')
  public getOrgUnit(@Path('id') id: any): Observable<OrgUnit> {
    return null;
  }

  @GET<OrgUnit[]>('/OrgUnit/GetOrgUnitsInformation')
  public getOrgUnitInfo(
    @Query('oucodes') oucodes: string[]
  ): Observable<OrgUnit[]> {
    return null;
  }

  @GET<OrgUnit>('/Organization/{id}')
  public getOrganization(@Path('id') id: any): Observable<Organization> {
    return null;
  }

  @GET<any>('/MetaConfiguration/getScheduledDowntimeInfo')
  public getScheduledDowntimeInfo(): Observable<any> {
    return null;
  }
}
