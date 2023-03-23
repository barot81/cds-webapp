import { Injectable } from '@angular/core';
import {
  AuthSandbox,
  Logger,
  MetaConstants,
  OrgFacade,
  RoleService,
  UserTypeService,
} from '@exxat/fusion/core';
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
    private readonly authSandbax: AuthSandbox,
    private roleService: RoleService,
    private orgFacade: OrgFacade,
    private userTypeService: UserTypeService
  ) {
    this.initializeRoleMeta();
  }

  private initializeRoleMeta() {
    this.roleMeta = this.roleService.getItem();
    if (this.roleMeta) {
      this.microserviceWiseFeatures = this.roleMeta?.data?.accesses ? this.roleMeta.data.accesses : [];
    } else {
      let tenantId = localStorage.getItem(MetaConstants.TENANTID);
      let isFaculty = this.userTypeService.isFacultyPersonaSelected();

      const hashCode = !this.roleMeta ? null : this.roleMeta.hash;
      this.orgFacade.selectedOucode$.pipe(
        switchMap(soc => {
          if (soc) {
            return this.authSandbax
              .role(hashCode, tenantId, soc.Oucode, isFaculty);
          }
          else return of(null);
        }
        ))
        .subscribe((response) => {
          if (response) {
            if (response['isModified']) {
              this.roleService.setItem(response);
            }
            this.roleMeta = response;
            this.microserviceWiseFeatures = this.roleMeta?.data?.accesses ? this.roleMeta.data.accesses : [];
          }
        })
        .unsubscribe();
    }
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
    let flag = false;
    for (let microserviceCode of microserviceCodes) {
      const featureCode = microserviceCode?.features?.find(function (res) {
        return res.featureCode === codeArray[1];
      });
      if (featureCode) {
        flag = this.checkPermission(featureCode.permissions, params);
        if (flag === true) {
          break;
        }
      }
    }
    return flag;
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
