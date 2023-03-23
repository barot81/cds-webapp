import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../../../material.module';
import { FuseProgressBarModule } from '../../../components/progress-bar/progress-bar.module';
import { FuseSidebarModule } from '../../../components/sidebar/sidebar.module';

import { ManifoldPanelComponent } from './manifold-panel.component';
import { ManifoldPanelContentDirective } from './manifold-panel-content.directive';
import { ManifoldPanelService } from './manifold-panel.service';
import { ManifoldPanelDirective } from './manifold-panel.directive';
import { A11yModule } from '@angular/cdk/a11y';
import { zhealthcareTooltipModule } from '../../../components/zhealthcare-tooltip/modules/tooltip.module';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FuseSidebarModule,
    FuseProgressBarModule,
    FlexLayoutModule,
    A11yModule,
    zhealthcareTooltipModule
  ],
  exports: [
    ManifoldPanelComponent,
    ManifoldPanelDirective,
    ManifoldPanelContentDirective,
  ],
  declarations: [
    ManifoldPanelComponent,
    ManifoldPanelDirective,
    ManifoldPanelContentDirective,
  ],
  providers: [ManifoldPanelService],
})
export class ManifoldPanelModule {}
