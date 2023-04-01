import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FuseSharedModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
  MaterialModule,
  zhealthcareTooltipModule,
} from '@zhealthcare/ux';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PagesContainerComponent } from './container/pages-container.component';
import { zhealthcareGRAPHSPAGES } from './pages';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [PagesContainerComponent, ...zhealthcareGRAPHSPAGES],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    NgxChartsModule,
    FuseSidebarModule,
    PagesRoutingModule,
    FuseThemeOptionsModule,
    zhealthcareTooltipModule,
  ],
  providers: [],
})
export class PagesModule {}
