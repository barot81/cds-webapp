import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zhealthcareAvatarListItemComponent } from './zhealthcare-avatar-list-item.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [zhealthcareAvatarListItemComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [zhealthcareAvatarListItemComponent]
})
export class zhealthcareAvatarListItemModule { }
