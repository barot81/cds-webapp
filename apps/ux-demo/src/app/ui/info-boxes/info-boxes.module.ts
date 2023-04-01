import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseThemeOptionsModule, MaterialModule } from '@zhealthcare/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { InfoBoxesRoutingModule } from './info-boxes-routing.module';
import { InfoBoxesComponent } from './pages/info-boxes.component';

@NgModule({
  declarations: [InfoBoxesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FuseHighlightModule,
    MaterialModule,
    InfoBoxesRoutingModule,
    FuseThemeOptionsModule
  ],
})
export class InfoBoxesModule {}
