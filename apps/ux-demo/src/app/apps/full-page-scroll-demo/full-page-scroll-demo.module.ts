import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPageScrollDemoRoutingModule } from './full-page-scroll-demo-routing.module';
import { FullPageScrollDemoComponent } from './full-page-scroll-demo/full-page-scroll-demo.component';
import { FullPageScrollDemoNavBarComponent } from './full-page-scroll-demo-nav-bar/full-page-scroll-demo-nav-bar.component';
import { FullPageScrollReviewDemoComponent } from './tabs/full-page-scroll-review-demo/full-page-scroll-review-demo.component';
import { MaterialModule, FuseSharedModule, FuseSidebarModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReviewStudentComponent } from './tabs/review-student/review-student.component';

@NgModule({
  declarations: [FullPageScrollDemoComponent, FullPageScrollDemoNavBarComponent, FullPageScrollReviewDemoComponent, ReviewStudentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FuseSharedModule,
    FuseSidebarModule,
    FlexLayoutModule,
    FullPageScrollDemoRoutingModule
  ]
})
export class FullPageScrollDemoModule { }
