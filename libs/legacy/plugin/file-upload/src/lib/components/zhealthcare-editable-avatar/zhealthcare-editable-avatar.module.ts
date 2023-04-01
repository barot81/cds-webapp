import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { zhealthcareSnackBarModule, MaterialModule } from '@zhealthcare/ux';
import { zhealthcareEditableAvatarComponent } from './zhealthcare-editable-avatar.component';
import { RBACDirectiveModule } from '@zhealthcare/fusion/directives';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [zhealthcareEditableAvatarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RBACDirectiveModule,
    MatDialogModule,
    FlexLayoutModule,
    zhealthcareSnackBarModule
  ],
  exports: [zhealthcareEditableAvatarComponent]
})
export class zhealthcareEditableAvatarModule { }
