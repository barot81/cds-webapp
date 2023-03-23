import { Injectable } from '@angular/core';

import { MetaConstants } from '../../helper/constants';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private currentRoles: {
    hash: string;
    data: [];
    isModified: boolean;
  };

  setItem(roles) {
    this.currentRoles = roles;
    if(this.currentRoles.isModified) {
      if (sessionStorage.getItem(MetaConstants.IsDelegateUser) === 'true') {
        sessionStorage.setItem(MetaConstants.META_ROLE_LOCAL_STORAGE_KEY, JSON.stringify(roles))
      }
      else {
        sessionStorage.setItem(MetaConstants.META_ROLE_LOCAL_STORAGE_KEY, JSON.stringify(roles))
        localStorage.setItem(MetaConstants.META_ROLE_LOCAL_STORAGE_KEY, JSON.stringify(roles));
      }
    }
  }

  getItem() {
    if (!this.currentRoles) {
      this.currentRoles =
        sessionStorage.getItem(MetaConstants.META_ROLE_LOCAL_STORAGE_KEY)
          ? JSON.parse(sessionStorage.getItem(MetaConstants.META_ROLE_LOCAL_STORAGE_KEY))
          : JSON.parse(localStorage.getItem(MetaConstants.META_ROLE_LOCAL_STORAGE_KEY));
    }
    return this.currentRoles;
  }

  clearItem() {
    this.currentRoles = null;
  }
}
