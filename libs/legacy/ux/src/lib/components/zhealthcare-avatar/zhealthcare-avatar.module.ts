import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zhealthcareAvatarComponent } from './zhealthcare-avatar.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout'
@NgModule({
  declarations: [zhealthcareAvatarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [zhealthcareAvatarComponent]
})
export class zhealthcareAvatarModule { }
