import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsComponent } from './apps.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponentComponent } from './dashboard/test-component/test-component.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  FuseProgressBarModule,
  FuseSharedModule,
  FuseSidebarModule,
  MaterialModule,
  FuseModule,
  zhealthcareAvatarModule,
  zhealthcareAvatarListItemModule,
} from '@zhealthcare/ux';
import { StudentStudentInfoComponent } from './demo-content/student-student-info/student-student-info.component';
import { DemoContentComponent } from './demo-content/demo-content.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { StudentGridComponent } from './student-grid/student-grid.component';
import { EditColumnsComponent } from './student-grid/edit-columns/edit-columns.component';
import { GridService } from './student-grid/grid.service';
import { ComplianceAdminModule } from './compliance/admin/compliance-admin.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SiteDemoModule } from './site-demo/site-demo.module';
import { NotificationComponent } from './notification/notification.component';
import { WizardComponent } from './notification/wizard/navigation-wizard.component';
import {
  NotificationWizardModule,
  NotificationLogModule,
} from '@zhealthcare/plugin/notifications';
import { NotificationService } from './notification/services/navigation.service';
import { AddSlotComponent } from './placemet/pages/add-slot/add-slot.component';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { NotificationLogComponent } from './notification/log/notification-log.component';
import { ComplianceSiteDemoModule } from './compliance-site-demo/compliance-site-demo.module';
import { FileUploadModule } from '@zhealthcare/plugin/file-upload';
import { InnerPageModule } from './inner-page/inner-page.module';
import { TermsAndConditionPageDemoModule } from './terms-and-condition-page-demo/terms-and-condition-page-demo.module';
import { TheCompleteDemoPageModule } from './the-complete-demo-page/the-complete-demo-page.module';
import { SlotBySiteModule } from './slot-by-site/slot-by-site.module';
import { SlotDemoModule } from './slot-demo/slot-demo.module';
import { PlacementByRotationModule } from './placement-by-rotation/placement-by-rotation.module';
import { SidebarWithTimelineModule } from './sidebar-with-timeline/sidebar-with-timeline.module';
import { PersonFromSiteLocationModule } from './person-from-site-location/person-from-site-location.module';
import { ESSWizardModule } from './ess-wizard/ess-wizard.module';
import { HorizontalTreeControlModule } from './horizontal-tree-control/horizontal-tree-control.module';
import { PlanAppDemoModule } from './plan-app-demo/plan-app-demo.module';
import { ComplianceDocumentDemoModule } from './compliance-document-demo/compliance-document-demo.module';
import { PlanCourseDetailsDemoModule } from './plan-app-demo/plan-course-details-demo/plan-course-details-demo.module';
import { PlanStaticDemoPagesModule } from './plan-app-demo/plan-static-demo-pages/plan-static-demo-pages.module';
import { PlanStudentDemoModule } from './plan-app-demo/plan-student-demo/plan-student-demo.module';
import { DrawerExamplesDemoModule } from './drawer-examples-demo/drawer-examples-demo.module';
import { MeasuresDrawersDemoModule } from './plan-app-demo/drawers/measures-drawers-demo/measures-drawers-demo.module';
import { PublicWebsiteDemoModule } from './public-website-demo/public-website-demo.module';
import { LandingPageDemoModule } from './landing-page-demo/landing-page-demo.module';
import { TenantOnboardingDemoModule } from './tenant-onboarding-demo/tenant-onboarding-demo.module';
import { InstitutionListDemoModule } from './institution-list-demo/institution-list-demo.module';
import { AddRecordsTenantOnboardingModule } from './add-records-tenant-onboarding/add-records-tenant-onboarding.module';
import { StaticRoleConfigurationPageModule } from './static-role-configuration-page/static-role-configuration-page.module';
import { FrequencyBasedEvalFormModule } from './frequency-based-eval-form/frequency-based-eval-form.module';
import { StudentWishlistDemoModule } from './student-wishlist-demo/student-wishlist-demo.module';
import { MapOfAffiliationDemoModule } from './map-of-affiliation-demo/map-of-affiliation-demo.module';
import { ErrorDemoModule } from './error-demo/error-demo.module';
import { ComplianceDemoContainerModule } from './compliance-demos-container/compliance-container.module';
import { SiteDemosContainerModule } from './site-demos-container/site-demos-container.module';
import { HomeScreenDemoModule } from './home-screen-demo';

import { SessionTimeOutModule } from './session-timeout';
import { ComplianceSummaryGridModule } from './compliance-summary-grid';
import { FacultyProfilePageModule } from './faculty-profile-page/faculty-profile-page.module';
import { ConfigurationCourseOfferingModule } from './configuration-course-offering/configuration-course-offering.module';
import { EssWizardPageNewModule } from './ess-wizard-page-new/ess-wizard-page-new.module';
import { SlotAndPlacementDemoModule } from './slot-and-placement-demo/slot-and-placement-demo.module';
import { StickyTableHeaderLayoutModule } from './sticky-table-header-layout';
import { ProfileNavbarComponent } from './profile/profile-nav-bar/profile-nav-bar.component';

const appRoutes: Routes = [
  {
    path: 'student',
    component: StudentGridComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: 'student',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      },
      {
        path: 'details',
        component: StudentStudentInfoComponent,
      },
      {
        path: 'teaching',
        component: DemoContentComponent,
      },
    ],
  },
  {
    path: 'dashboards/students',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'compliance/student',
    component: ComplianceComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'compliance/admin',
    loadChildren: () =>
      import('./compliance/admin/compliance-admin.module').then(
        (mod) => mod.ComplianceAdminModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'home-screen-demo',
    loadChildren: () =>
      import('./home-screen-demo/home-screen-demo.module').then(
        (mod) => mod.HomeScreenDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'placement',
    loadChildren: () =>
      import('./placement/placement.module').then((mod) => mod.PlacementModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'site',
    loadChildren: () =>
      import('./site-demo/site-demo.module').then((mod) => mod.SiteDemoModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'plan-of-study-demo',
    loadChildren: () =>
      import('./planofstudydemo/planofstudydemo.module').then(
        (mod) => mod.PlanofstudydemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'inner-page-demo',
    loadChildren: () =>
      import('./inner-page/inner-page.module').then(
        (mod) => mod.InnerPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'slot-by-site',
    loadChildren: () =>
      import('./slot-by-site/slot-by-site.module').then(
        (mod) => mod.SlotBySiteModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'static-role-configuration-page',
    loadChildren: () =>
      import(
        './static-role-configuration-page/static-role-configuration-page.module'
      ).then((mod) => mod.StaticRoleConfigurationPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'frequency-based-eval-form',
    loadChildren: () =>
      import(
        './frequency-based-eval-form/frequency-based-eval-form.module'
      ).then((mod) => mod.FrequencyBasedEvalFormModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'public-website-demo',
    loadChildren: () =>
      import('./public-website-demo/public-website-demo.module').then(
        (mod) => mod.PublicWebsiteDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'landing-page-demo',
    loadChildren: () =>
      import('./landing-page-demo/landing-page-demo.module').then(
        (mod) => mod.LandingPageDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'horizontal-tree-control',
    loadChildren: () =>
      import('./horizontal-tree-control/horizontal-tree-control.module').then(
        (mod) => mod.HorizontalTreeControlModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'ESS-wizard',
    loadChildren: () =>
      import('./ess-wizard/ess-wizard.module').then(
        (mod) => mod.ESSWizardModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'person-from-site-location',
    loadChildren: () =>
      import(
        './person-from-site-location/person-from-site-location.module'
      ).then((mod) => mod.PersonFromSiteLocationModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'slot-by-site',
    loadChildren: () =>
      import('./placement-by-rotation/placement-by-rotation.module').then(
        (mod) => mod.PlacementByRotationModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'slot-demo',
    loadChildren: () =>
      import('./slot-demo/slot-demo.module').then((mod) => mod.SlotDemoModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'tenant-onboarding-demo',
    loadChildren: () =>
      import('./tenant-onboarding-demo/tenant-onboarding-demo.module').then(
        (mod) => mod.TenantOnboardingDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'institution-list-demo',
    loadChildren: () =>
      import('./institution-list-demo/institution-list-demo.module').then(
        (mod) => mod.InstitutionListDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-records-tenant-onboarding',
    loadChildren: () =>
      import(
        './add-records-tenant-onboarding/add-records-tenant-onboarding.module'
      ).then((mod) => mod.AddRecordsTenantOnboardingModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'faculty-profile-page',
    loadChildren: () =>
      import('./faculty-profile-page/faculty-profile-page.module').then(
        (mod) => mod.FacultyProfilePageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'configuration-course-offering',
    loadChildren: () =>
      import(
        './configuration-course-offering/configuration-course-offering.module'
      ).then((mod) => mod.ConfigurationCourseOfferingModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'ess-wizard-page-new',
    loadChildren: () =>
      import('./ess-wizard-page-new/ess-wizard-page-new.module').then(
        (mod) => mod.EssWizardPageNewModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'student-wishlist-demo',
    loadChildren: () =>
      import('./student-wishlist-demo/student-wishlist-demo.module').then(
        (mod) => mod.StudentWishlistDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'map-of-affiliation-demo',
    loadChildren: () =>
      import('./map-of-affiliation-demo/map-of-affiliation-demo.module').then(
        (mod) => mod.MapOfAffiliationDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'slot-and-placement-demo',
    loadChildren: () =>
      import('./slot-and-placement-demo/slot-and-placement-demo.module').then(
        (mod) => mod.SlotAndPlacementDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'drawer-examples-demo',
    loadChildren: () =>
      import('./drawer-examples-demo/drawer-examples-demo.module').then(
        (mod) => mod.DrawerExamplesDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'plan-app-demo',
    loadChildren: () =>
      import(
        './plan-app-demo/plan-course-details-demo/plan-course-details-demo.module'
      ).then((mod) => mod.PlanCourseDetailsDemoModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'measures-drawers-demo',
    loadChildren: () =>
      import(
        './plan-app-demo/drawers/measures-drawers-demo/measures-drawers-demo.module'
      ).then((mod) => mod.MeasuresDrawersDemoModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'compliance-document-demo',
    loadChildren: () =>
      import('./compliance-document-demo/compliance-document-demo.module').then(
        (mod) => mod.ComplianceDocumentDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'sidebar-with-timeline',
    loadChildren: () =>
      import('./sidebar-with-timeline/sidebar-with-timeline.module').then(
        (mod) => mod.SidebarWithTimelineModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'terms-and-condition-page-demo',
    loadChildren: () =>
      import(
        './terms-and-condition-page-demo/terms-and-condition-page-demo.module'
      ).then((mod) => mod.TermsAndConditionPageDemoModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'the-complete-demo-page',
    loadChildren: () =>
      import('./the-complete-demo-page/the-complete-demo-page.module').then(
        (mod) => mod.TheCompleteDemoPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'patientlog-demo',
    loadChildren: () =>
      import('./patientlog-demo/patientlog-demo.module').then(
        (mod) => mod.PatientlogDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'evaluation-admin-demo',
    loadChildren: () =>
      import('./evaluation-admin-demo/evaluation-admin-demo.module').then(
        (mod) => mod.EvaluationAdminDemoModule
      ),
    canActivate: [AuthGuardService],
  },

  {
    path: 'programs-dashboard-demo',
    loadChildren: () =>
      import('./programs-dashboard/programs-dashboard.module').then(
        (mod) => mod.ProgramsDashboardModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'payment-demo',
    loadChildren: () =>
      import('./payment-demo/payment-demo.module').then(
        (mod) => mod.PaymentDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'compliance-site-demo',
    loadChildren: () =>
      import('./compliance-site-demo/compliance-site-demo.module').then(
        (mod) => mod.ComplianceSiteDemoModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'full-page-scroll-demo',
    loadChildren: () =>
      import('./full-page-scroll-demo/full-page-scroll-demo.module').then(
        (mod) => mod.FullPageScrollDemoModule
      ),
  },
  {
    path: 'plan-static-demo-pages',
    loadChildren: () =>
      import(
        './plan-app-demo/plan-static-demo-pages/plan-static-demo-pages.module'
      ).then((mod) => mod.PlanStaticDemoPagesModule),
  },
  {
    path: 'plan-student-demo',
    loadChildren: () =>
      import('./plan-app-demo/plan-student-demo/plan-student-demo.module').then(
        (mod) => mod.PlanStudentDemoModule
      ),
  },
  {
    path: 'plan-app-demo',
    loadChildren: () =>
      import('./plan-app-demo/plan-app-demo.module').then(
        (mod) => mod.PlanAppDemoModule
      ),
  },
  {
    path: 'release-notes-demo-app',
    loadChildren: () =>
      import('./release-notes-demo-app/release-notes-demo-app.module').then(
        (mod) => mod.ReleaseNotesDemoAppModule
      ),
  },
  {
    path: 'login_demo',
    loadChildren: () =>
      import('./login-demo').then((mod) => mod.LoginDemoModule),
  },
  {
    path: 'data-level-security-demo',
    loadChildren: () =>
      import('./data-level-security-demo').then(
        (mod) => mod.DataLevelSecurityDemoModule
      ),
  },
  {
    path: 'profile-admin-print-demo',
    loadChildren: () =>
      import('./profile-admin-print-demo').then(
        (mod) => mod.ProfileAdminPrintDemoModule
      ),
  },
  {
    path: 'left-sidebar-layout',
    loadChildren: () =>
      import('./left-sidebar-layout').then(
        (mod) => mod.LeftSidebarLayoutModule
      ),
  },
  {
    path: 'error-demo',
    loadChildren: () =>
      import('./error-demo/error-demo.module').then(
        (mod) => mod.ErrorDemoModule
      ),
  },
  {
    path: 'plan-demos',
    loadChildren: () =>
      import('./plan-app-demo/container/plan-demos-container.module').then(
        (mod) => mod.PlanDemosContainerModule
      ),
  },
  {
    path: 'compliance-demos',
    loadChildren: () =>
      import('./compliance-demos-container/compliance-container.module').then(
        (mod) => mod.ComplianceDemoContainerModule
      ),
  },
  {
    path: 'site-demos',
    loadChildren: () =>
      import('./site-demos-container/site-demos-container.module').then(
        (mod) => mod.SiteDemosContainerModule
      ),
  },
  {
    path: 'session-timeout',
    loadChildren: () =>
      import('./session-timeout').then((mod) => mod.SessionTimeOutModule),
  },
  {
    path: 'compliance-summary-grid',
    loadChildren: () =>
      import('./compliance-summary-grid').then(
        (mod) => mod.ComplianceSummaryGridModule
      ),
  },
  {
    path: 'sticky-table-header-layout',
    loadChildren: () =>
      import('./sticky-table-header-layout').then(
        (mod) => mod.StickyTableHeaderLayoutModule
      ),
  },
];
@NgModule({
  declarations: [
    AppsComponent,
    ProfileComponent,
    ProfileNavbarComponent,
    DashboardComponent,
    DemoContentComponent,
    TestComponentComponent,
    ReactiveFormComponent,
    StudentStudentInfoComponent,
    ComplianceComponent,
    StudentGridComponent,
    EditColumnsComponent,
    NotificationComponent,
    NotificationLogComponent,
    WizardComponent,
    AddSlotComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FuseProgressBarModule,
    FuseSharedModule,
    FuseModule,
    FileUploadModule,
    FuseSidebarModule,
    ComplianceAdminModule,
    NotificationLogModule,
    DragDropModule,
    zhealthcareAvatarModule,
    SiteDemoModule,
    zhealthcareAvatarListItemModule,
    NotificationWizardModule,
    DataSourceModule,
    ComplianceSiteDemoModule,
    InnerPageModule,
    TermsAndConditionPageDemoModule,
    TheCompleteDemoPageModule,
    SlotBySiteModule,
    StaticRoleConfigurationPageModule,
    FrequencyBasedEvalFormModule,
    PublicWebsiteDemoModule,
    LandingPageDemoModule,
    HorizontalTreeControlModule,
    ESSWizardModule,
    SlotDemoModule,
    TenantOnboardingDemoModule,
    InstitutionListDemoModule,
    AddRecordsTenantOnboardingModule,
    FacultyProfilePageModule,
    ConfigurationCourseOfferingModule,
    EssWizardPageNewModule,
    StudentWishlistDemoModule,
    MapOfAffiliationDemoModule,
    PlanCourseDetailsDemoModule,
    MeasuresDrawersDemoModule,
    PlanStaticDemoPagesModule,
    ComplianceDocumentDemoModule,
    PersonFromSiteLocationModule,
    SidebarWithTimelineModule,
    PlacementByRotationModule,
    PlanAppDemoModule,
    PlanStudentDemoModule,
    DrawerExamplesDemoModule,
    ErrorDemoModule,
    ComplianceDemoContainerModule,
    SiteDemosContainerModule,
    SlotAndPlacementDemoModule,
    HomeScreenDemoModule,
    SessionTimeOutModule,
    ComplianceSummaryGridModule,
    StickyTableHeaderLayoutModule
  ],
  providers: [GridService, NotificationService],
  exports: [
    AppsComponent,
    TestComponentComponent,
    DemoContentComponent,
    StudentStudentInfoComponent,
    ProfileComponent,
    ReactiveFormComponent,
  ],
})
export class AppsModule {}
