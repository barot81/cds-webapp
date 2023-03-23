import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExxatTooltipModule, MaterialModule } from '@exxat/ux';

import { RegistrationApiClient } from './registration.ApiClient';
import { RegistrationSandbox } from './registration.sandbox';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomDirectiveModule } from '@exxat/fusion/directives';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ExxatTooltipModule,
    CustomDirectiveModule,
    RouterModule.forChild(routes)
  ],
  exports: [RegisterComponent,
      TermsAndConditionsComponent
    ],
  declarations: [RegisterComponent,
      TermsAndConditionsComponent
    ],
  providers: [RegistrationApiClient, RegistrationSandbox],
  entryComponents: [TermsAndConditionsComponent]
})
export class RegistrationModule {}
