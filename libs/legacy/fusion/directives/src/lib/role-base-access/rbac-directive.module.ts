
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoleBasedAccessService } from '@exxat/fusion/services';
import { RoleBasedAccessControlDirective } from './role-based-access-control.directive';

@NgModule({
  declarations: [RoleBasedAccessControlDirective],
  imports: [CommonModule],
  providers: [
    RoleBasedAccessService
  ],
  exports: [RoleBasedAccessControlDirective]
})
export class RBACDirectiveModule { }
