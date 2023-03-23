import { NgModule } from '@angular/core';
import { VerticalLayout1Module } from './vertical/layout-1/layout-1.module';
import { FuseThemeOptionsModule } from '../components';

@NgModule({
  imports: [VerticalLayout1Module, FuseThemeOptionsModule],
  exports: [VerticalLayout1Module],
  declarations: [],
})
export class LayoutModule {}
