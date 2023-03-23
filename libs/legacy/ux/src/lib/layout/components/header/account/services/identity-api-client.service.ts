import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Body,
  POST,
  HttpService
} from '@zhealthcare/fusion/core';
import { ChangePassword } from '../components/change-password/ChangePassword';

@Injectable({providedIn: 'any'})
export class SharedIdentityApiClient extends HttpService {
  config;
  constructor() {
    super();
    this.config = this.configService.appSettings.auth.endpoint;
  }

  getBaseUrl(): string {
    return this.config;
  }

  @POST("/Password/VerifyPassword",null)
  public verifyPassword(@Body changePassword: ChangePassword): Observable<boolean> {
    return null;
  }

  @POST("/Password/ChangePassword",null)
  public changePassword(@Body changePassword: ChangePassword): Observable<boolean> {
    return null;
  }

}


