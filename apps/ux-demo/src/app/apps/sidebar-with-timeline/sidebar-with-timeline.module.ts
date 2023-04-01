import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarWithTimelineRoutingModule } from './sidebar-with-timeline-routing.module';
import { SidebarWithTimelineComponent } from './sidebar-with-timeline.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule, FuseSharedModule, LayoutModule, FuseSidebarModule } from '@exxat/ux';
import { StepThreeContentComponent } from './content/step-three-content/step-three-content.component';
import { StepFourContentComponent } from './content/step-four-content/step-four-content.component';
import { StepFiveContentComponent } from './content/step-five-content/step-five-content.component';
import { StepSixContentComponent } from './content/step-six-content/step-six-content.component';
import { StepOneContentComponent } from './content/step-one-content/step-one-content.component';
import { StepTwoContentComponent } from './content/step-two-content/step-two-content.component';
import { TimelineContentService } from './timeline-content.service';

@NgModule({
  declarations: [
    SidebarWithTimelineComponent,
    StepOneContentComponent,
    StepTwoContentComponent,
    StepThreeContentComponent,
    StepFourContentComponent,
    StepFiveContentComponent,
    StepSixContentComponent
  ],
  imports: [
    CommonModule,
    SidebarWithTimelineRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    LayoutModule,
    FuseSidebarModule
  ],
  providers: [TimelineContentService]
})
export class SidebarWithTimelineModule { }
