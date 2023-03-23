import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatAvatarComponent } from './exxat-avatar.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout'
@NgModule({
  declarations: [ExxatAvatarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [ExxatAvatarComponent]
})
export class ExxatAvatarModule { }
