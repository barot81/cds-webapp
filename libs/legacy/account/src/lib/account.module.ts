import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityModule } from '@zhealthcare/account/identity';
import { MetaModule } from '@zhealthcare/account/meta';

@NgModule({
  imports: [CommonModule, IdentityModule, MetaModule],
  exports: [IdentityModule, MetaModule],
})
export class AccountModule {}
