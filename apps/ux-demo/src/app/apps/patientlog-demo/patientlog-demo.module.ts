import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientlogDemoRoutingModule } from './patientlog-demo-routing.module';
import { PatientlogDemoComponent } from './patientlog-demo.component';
import { PatientlogReviewComponent } from './tabs/patientlog-review/patientlog-review.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule, FuseSidebarModule, MaterialModule, zhealthcareAvatarModule, zhealthcareAvatarListItemModule } from '@zhealthcare/ux';
import { PatientLogDemoNavbarComponent } from './patient-log-demo-navbar/patient-log-demo-navbar.component';
import { RouterModule } from '@angular/router';
import { PatientlogStatisticsComponent } from './tabs/patientlog-statistics/patientlog-statistics.component';

@NgModule({
  declarations: [PatientlogDemoComponent, PatientlogReviewComponent, PatientLogDemoNavbarComponent, PatientlogStatisticsComponent],
  imports: [
    CommonModule,
    PatientlogDemoRoutingModule,
    FlexLayoutModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule, 
    RouterModule,
    zhealthcareAvatarModule,
    zhealthcareAvatarListItemModule
  ]
})
export class PatientlogDemoModule { }
