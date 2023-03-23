import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatAvatarListItemComponent } from './exxat-avatar-list-item.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ExxatAvatarListItemComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [ExxatAvatarListItemComponent]
})
export class ExxatAvatarListItemModule { }
