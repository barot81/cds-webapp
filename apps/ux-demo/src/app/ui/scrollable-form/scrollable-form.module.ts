import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  zhealthcareTooltipModule,
  FuseDirectivesModule,
  FuseSidebarModule,
  MaterialModule
} from '@zhealthcare/ux';
import {
  FormStepComponent,
  LayoutHeaderComponent,
  LayoutnavBarComponent,
  LayoutSidebarComponent
} from './components';

import { ScrollableFormContainerComponent } from './container/scrollable-form-container.component';
import { ScrollableFormContentComponent } from './pages/scrollable-form-content.component';
import { ScrollableFormRoutingModule } from './scrollable-form-routing.module';
@NgModule({
  declarations: [
    ScrollableFormContainerComponent,
    ScrollableFormContentComponent,
    LayoutnavBarComponent,
    LayoutHeaderComponent,
    LayoutSidebarComponent,
    FormStepComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSidebarModule,
    FuseDirectivesModule,
    ScrollableFormRoutingModule,
    zhealthcareTooltipModule
  ]
})
export class ScrollableFormModule {}
