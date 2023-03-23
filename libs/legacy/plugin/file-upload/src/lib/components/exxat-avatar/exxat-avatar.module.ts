import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@zhealthcare/ux';
import { zhealthcareAvatarComponent } from './zhealthcare-avatar.component';

@NgModule({
  declarations: [zhealthcareAvatarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [zhealthcareAvatarComponent]
})
export class zhealthcareAvatarModule { }
