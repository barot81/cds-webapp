import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { AutoOpenMenuComponent } from './auto-open-menu.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MaterialModule],
  declarations: [AutoOpenMenuComponent],
  exports: [AutoOpenMenuComponent]
})
export class AutoOpenMenuModule {}
