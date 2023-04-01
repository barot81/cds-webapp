import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FuseSharedModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
  MaterialModule,
  ExxatTooltipModule,
} from '@exxat/ux';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PagesContainerComponent } from './container/pages-container.component';
import { EXXATGRAPHSPAGES } from './pages';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [PagesContainerComponent, ...EXXATGRAPHSPAGES],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    NgxChartsModule,
    FuseSidebarModule,
    PagesRoutingModule,
    FuseThemeOptionsModule,
    ExxatTooltipModule,
  ],
  providers: [],
})
export class PagesModule {}
