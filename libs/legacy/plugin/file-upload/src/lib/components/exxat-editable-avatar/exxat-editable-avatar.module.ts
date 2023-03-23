import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ExxatSnackBarModule, MaterialModule } from '@exxat/ux';
import { ExxatEditableAvatarComponent } from './exxat-editable-avatar.component';
import { RBACDirectiveModule } from '@exxat/fusion/directives';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ExxatEditableAvatarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RBACDirectiveModule,
    MatDialogModule,
    FlexLayoutModule,
    ExxatSnackBarModule
  ],
  exports: [ExxatEditableAvatarComponent]
})
export class ExxatEditableAvatarModule { }
