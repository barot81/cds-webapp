import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Sandbox } from '@exxat/fusion/core';

import { SharedIdentityApiClient } from './identity-api-client.service';
import { ChangePassword } from '../components/change-password/ChangePassword';

@Injectable({providedIn: 'any'})
export class SharedIdentitySandbox extends Sandbox {

  constructor(
    private identityApiClient: SharedIdentityApiClient,
  ) {
    super();
  }

  public verifyPassword(passwordModel: ChangePassword): Observable<boolean> {
    return this.identityApiClient.verifyPassword(passwordModel);
  }

  public changePassword(passwordModel: ChangePassword): Observable<boolean> {
    return this.identityApiClient.changePassword(passwordModel);
  }

}
