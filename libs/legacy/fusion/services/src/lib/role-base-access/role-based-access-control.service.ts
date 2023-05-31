import { Injectable } from '@angular/core';
import {
  AuthSandbox,
  Logger,
  MetaConstants,
  OrgFacade,
  RoleService,
  UserTypeService,
} from '@zhealthcare/fusion/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { myAccessRights } from './rbac.constants';


@Injectable({
  providedIn: 'any'
})
export class RoleBasedAccessService {
  roleMeta;
  microserviceWiseFeatures = [];

  constructor(
    private roleService: RoleService,
  ) {
  }




  hasAccess(microservicodeWithfeatureCode: string, params: {}): boolean {
    if (
      !microservicodeWithfeatureCode || !params
    ) {
      Logger.trace(
        'Passed Microservice code, feature code or permission is empty. verify the inputs.'
      );
      return true;
    }

    const currentRole = this.roleService.getItem();
    if (
      this.roleMeta &&
      currentRole &&
      this.roleMeta.hash !== currentRole.hash
    ) {
      Logger.trace(
        `Role document is changed new role document. ${currentRole}`
      );
      this.roleMeta = currentRole;
      this.microserviceWiseFeatures = this.roleMeta?.data?.accesses ? this.roleMeta.data.accesses : [];
    }
    if (!this.roleMeta) {
      Logger.trace('Role Document does not exist.');
    }
    const codeArray = microservicodeWithfeatureCode.split(':');
    const microserviceCodes = this.microserviceWiseFeatures?.filter(
      (x) => x.microserviceCode === codeArray[0]
    );
    return false;
  }

  private checkPermission(
    selectedFeaturecodePermissions: string[],
    params: any
  ): boolean {
    let flag = false;
    for (const can of params['CAN']) {
      const permission = myAccessRights.find((pilot) => pilot['id'] === can);
      if (selectedFeaturecodePermissions?.includes(permission['value'])) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  getRoleMeta() {
    if (this.roleMeta === null || this.roleMeta === undefined) {
      return this.roleService.getItem();
    }
    return this.roleMeta;
  }
}
