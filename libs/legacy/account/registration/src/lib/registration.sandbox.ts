import { Injectable } from '@angular/core';
import { Sandbox } from '@zhealthcare/fusion/core';

import { RegistrationApiClient } from './registration.ApiClient';
import { Observable } from 'rxjs';
import { Registration } from './models/registration.model';

@Injectable({providedIn: 'any'})
export class RegistrationSandbox extends Sandbox {
  constructor(private registrationApiClient: RegistrationApiClient) {
    super();
  }

  public terms(): Observable<any> {
    return this.registrationApiClient.terms();
  }

  public getRegister(registration: any): Observable<any> {
    return this.registrationApiClient.getRegister(registration);
  }

  public register(registration: Registration): Observable<Registration> {
    return this.registrationApiClient.register(registration);
  }
}
