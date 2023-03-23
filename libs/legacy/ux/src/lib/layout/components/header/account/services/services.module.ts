import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedIdentityApiClient } from './identity-api-client.service';
import { SharedIdentitySandbox } from './identity.sandbox';
import { IdentityComponentMapService } from './identity.component-map.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    SharedIdentityApiClient, 
    SharedIdentitySandbox,
    IdentityComponentMapService
  ]
})
export class SharedServicesAccountModule {}