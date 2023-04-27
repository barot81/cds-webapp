import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthGuardService,
  loadRemoteModuleFromDefinitions,
} from '@exxat/fusion/core';
import { BackNavigationGuard } from '@exxat/ux';
import { AcademicsComponent } from './academics/academics.component';
import { AdminComponent } from './admin.component';
import { DetailsComponent } from './details/details.component';
import { StudentInterventionLogComponent } from './intervention-log/intervention-log.component';
import { LearningActivitiesComponent } from './learning-activities/learning-activities.component';
import { PatientLogComponent } from './learning-activities/patient-log/patient-log.component';
import { StudentCommunicationComponent } from './student-communication/student-communication.component';
import { AdvanceSearchComponent } from './student-grids/advance-search/advance-search.component';
import { SearchComponent } from './student-grids/search/search.component';
import { StudentGridsComponent } from './student-grids/student-grids.component';
import { ContactComponent } from './student-info/contact/contact.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { StudentPowerBIReportComponent } from './student-power-bi-report/student-power-bi-report.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [BackNavigationGuard],
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: StudentGridsComponent,
        canDeactivate: [BackNavigationGuard],
        children: [
          {
            path: '',
            redirectTo: 'grid-view',
            pathMatch: 'full',
          },
          {
            path: 'grid-view',
            component: SearchComponent,
            canDeactivate: [BackNavigationGuard]
          },
          {
            path: 'advanced-view',
            component: AdvanceSearchComponent,
            canDeactivate: [BackNavigationGuard]
          },
        ],
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
        canActivate: [AuthGuardService],
        canDeactivate: [BackNavigationGuard]
      },
      {
        path: 'configuration',
        loadChildren: () =>
          loadRemoteModuleFromDefinitions(
            'settings',
            './AdminModule',
            'SettingsAdminModule'
          ),
          canDeactivate: [BackNavigationGuard]
      },

      {
        path: 'dashboard',
        component: StudentPowerBIReportComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'details/:profileId',
        component: DetailsComponent,
        canActivate: [AuthGuardService],
        canDeactivate: [BackNavigationGuard],
        children: [
          {
            path: '',
            redirectTo: 'academics',
            pathMatch: 'full',
          },
          {
            path: 'academics',
            component: AcademicsComponent,
            canDeactivate: [BackNavigationGuard],
          },
          {
            path: 'info',
            component: StudentInfoComponent,
            canActivate: [AuthGuardService],
            canDeactivate: [BackNavigationGuard],
          },
          {
            path: 'contact',
            component: ContactComponent,
            canActivate: [AuthGuardService],
            canDeactivate: [BackNavigationGuard],
          },
          {
            path: 'compliance',
            loadChildren: () =>
              loadRemoteModuleFromDefinitions(
                'compliance',
                './ComplianceAdminView',
                'ComplianceAdminViewModule'
              ),
            canActivate: [AuthGuardService],
            canDeactivate: [BackNavigationGuard],
          },
          {
            path: 'communications',
            component: StudentCommunicationComponent,
            canActivate: [AuthGuardService],
            canDeactivate: [BackNavigationGuard],
          },
          {
            path: 'interventions',
            component: StudentInterventionLogComponent,
            canActivate: [AuthGuardService],
            canDeactivate: [BackNavigationGuard],
          },
          {
            path: 'clinicalcoursework',
            loadChildren: () =>
              loadRemoteModuleFromDefinitions(
                'plan-of-study',
                './AdminCourseWorkModule',
                'AdminCourseWorkModule'
              ),
            canActivate: [AuthGuardService],
            canDeactivate: [BackNavigationGuard],
          },
          {
            path: 'learningactivities',
            component: LearningActivitiesComponent,
            canActivate: [AuthGuardService],
            children: [
              {
                path: '',
                redirectTo: 'evaluations',
                pathMatch: 'full',
              },
              {
                path: 'evaluations',
                loadChildren: () =>
                  loadRemoteModuleFromDefinitions(
                    'evaluation',
                    './ProfileManagementRoutingModule',
                    'ProfileManagementRoutingModule'
                  ),
                canActivate: [AuthGuardService],
                canDeactivate: [BackNavigationGuard],
              },
              {
                path: 'patientlog',
                component: PatientLogComponent,
              },
              {
                path: 'timesheet',
                loadChildren: () =>
                  loadRemoteModuleFromDefinitions(
                    'timesheet',
                    './TimesheetFlipViewModule',
                    'TimesheetFlipViewModule'
                  ),
                canDeactivate: [BackNavigationGuard],
              },
              {
                path: 'timeoff',
                loadChildren: () =>
                  loadRemoteModuleFromDefinitions(
                    'timesheet',
                    './TimeOffFlipViewModule',
                    'TimeOffFlipViewModule'
                  ),
                canDeactivate: [BackNavigationGuard],  
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AdminRoutingModule {}
