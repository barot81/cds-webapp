import { Injectable } from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';

import { ChangePasswordComponent } from '../components/change-password/change-password.component';

@Injectable({providedIn: 'any'})
export class IdentityComponentMapService extends ComponentMap {
    constructor() {
        super();
        this.add('change-password', ChangePasswordComponent);
    }
}
