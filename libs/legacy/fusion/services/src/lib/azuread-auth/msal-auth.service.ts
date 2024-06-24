import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { RuntimeConfigLoaderService } from '@zhealthcare-core/angular-runtime-config';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from './custom-jwt-payload.model';

@Injectable({providedIn: 'root'})
export class MsalAuthService {
  private clientId: string;
  private groupMapping: {[key:string]:string};
  private groupIds: string[];
  constructor(
    private authService: MsalService,
    private router: Router,
    protected _runtimeConfigLoaderService: RuntimeConfigLoaderService,
  ) {
    const config = this._runtimeConfigLoaderService.getConfigObjectKey('appSettings');
    this.clientId = config.azureAd.clientId;
    this.groupMapping = config.azureAd.groupMapping;
  }

  async getGroupsFromToken() {
    if(this.groupIds) {
      return this.groupIds;
    }
    const account = this.authService.instance.getActiveAccount();
    const response = await this.authService.instance
    .acquireTokenSilent({
      account: account,
      scopes: [`${this.clientId}/openid`],
    });
    const token = response.accessToken;
    if (!token) {
      this.router.navigate(['account/login']);
      return null;
    }
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    this.groupIds  = this.getUserRolesFromGroupIds(decodedToken.groups);
    return this.groupIds;
  }

  private getUserRolesFromGroupIds(groupIds: string[]): string[] {
    const roles: string[] = Object.entries(this.groupMapping)
      .filter((x) => groupIds.includes(x[1]))
      .map((x) => x[0]);
    return roles.filter((role) => !!role); // Filter out undefined roles
  }

  checkUserAccess(
    userGroupsFromToken: string[],
    requiredGroups: string[]
  ): boolean {
    return requiredGroups.some((role) => userGroupsFromToken.includes(role));
  }
}
