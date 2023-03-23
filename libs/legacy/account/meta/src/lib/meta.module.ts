import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AdminLaunchComponent } from './components/admin-launch/admin-launch.component';
import { DelegatorLaunchComponent } from './components/delegator/delegator-launch.component';
import { FacultyLaunchComponent } from './components/faculty-launch/faculty-launch-component';
import { LaunchComponent } from './components/launch/launch.component';
import { StudentLaunchComponent } from './components/student-launch/student-launch.component';
import { MetaApiClient } from './meta.ApiClient';
import { MetaSandbox } from './meta.sandbox';
import { FacultyInformationApiClient } from './services/faculty-information/faculty-information-client.service';
import { LookupAPIClientService } from './services/lookup/lookup-APIClient.service';

const routes: Routes = [
  {
    path: 'account/launch',
    component: LaunchComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'student/account/launch',
    component: StudentLaunchComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/account/launch',
    component: AdminLaunchComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'faculty/account/launch',
    component: FacultyLaunchComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'delegator/account/launch',
    component: DelegatorLaunchComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    FuseSidebarModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes),
  ],
  exports: [LaunchComponent],
  declarations: [
    LaunchComponent,
    StudentLaunchComponent,
    AdminLaunchComponent,
    FacultyLaunchComponent,
    DelegatorLaunchComponent,
  ],
  providers: [
    MetaApiClient,
    MetaSandbox,
    FacultyInformationApiClient,
    LookupAPIClientService,
  ],
})
export class MetaModule {}
