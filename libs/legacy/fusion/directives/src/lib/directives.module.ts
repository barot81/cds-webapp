import { NgModule } from '@angular/core';
import { RBACDirectiveModule } from './role-base-access/rbac-directive.module';
import { CustomDirectiveModule } from './validation/custom-directives.module';

@NgModule({
  imports: [RBACDirectiveModule, CustomDirectiveModule],
  exports: [RBACDirectiveModule, CustomDirectiveModule],
})
export class DirectivesModule {}
