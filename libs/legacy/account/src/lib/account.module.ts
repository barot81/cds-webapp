import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityModule } from '@exxat/account/identity';
import { MetaModule } from '@exxat/account/meta';

@NgModule({
  imports: [CommonModule, IdentityModule, MetaModule],
  exports: [IdentityModule, MetaModule],
})
export class AccountModule {}
