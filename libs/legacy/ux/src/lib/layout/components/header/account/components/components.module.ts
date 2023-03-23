import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { SharedServicesAccountModule } from '../services/services.module';
import { MaterialModule } from '../../../../../material.module';

@NgModule({
  imports: [
    CommonModule, 
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedServicesAccountModule
  ],
  declarations: [
    ChangePasswordComponent,
    PasswordStrengthComponent
  ],
  exports: [
    ChangePasswordComponent,
    PasswordStrengthComponent
  ],
})
export class SharedComponentsAccountModule {}
