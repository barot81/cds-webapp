import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@exxat/ux';
import { ExxatAvatarComponent } from './exxat-avatar.component';

@NgModule({
  declarations: [ExxatAvatarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ExxatAvatarComponent]
})
export class ExxatAvatarModule { }
