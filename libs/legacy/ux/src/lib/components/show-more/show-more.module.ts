import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FuseSharedModule } from '../../shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowMoreComponent } from './component/show-more.component';

@NgModule({
  declarations: [ShowMoreComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FuseSharedModule,
    FlexLayoutModule
  ],
  exports: [ShowMoreComponent]
})
export class ShowMoreModule { }
