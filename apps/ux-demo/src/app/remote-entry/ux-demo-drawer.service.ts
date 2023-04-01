import { Injectable, OnInit } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { ViewInstructionDemoComponent } from '../ui/scroll-spy-demo/examples/component-level-scroll-example/view-instruction-demo/view-instruction-demo/view-instruction-demo.component';
import { DrawerWithTableComponent } from '../ui/zhealthcare-ui-components/tabs/evaluation-drawer-examples/drawer-with-table/drawer-with-table.component';
import { DrawerWithSectionsComponent } from '../ui/zhealthcare-ui-components/tabs/evaluation-drawer-examples/drawer-with-sections/drawer-with-sections.component';
import { createNewStandardFormComponent } from '../ui/zhealthcare-ui-components/tabs/evaluation-drawer-examples/create-new-standard-form/create-new-standard-form.component';
import { addBenchmarkComponent } from '../ui/zhealthcare-ui-components/tabs/evaluation-drawer-examples/add-benchmark/add-benchmark.component';
import { AddFormDrawerComponent } from '../apps/configuration-course-offering/add-form-drawer/add-form-drawer.component';
import { AddRecordsDrawerDemoComponent } from '../apps/add-records-tenant-onboarding/add-records-drawer-demo/add-records-drawer-demo.component';
import { AssociateClinicalInstructorDrawerComponent } from '../apps/drawer-examples-demo/associate-clinical-instructor-drawer/associate-clinical-instructor-drawer.component';
import { PreviewDemoContentComponent } from '../apps/drawer-examples-demo/associate-clinical-instructor-drawer/preview-demo-content/preview-demo-content.component';
import { FrequencyBasedEvalFormDrawerComponent } from '../apps/frequency-based-eval-form/frequency-based-eval-form-drawer/frequency-based-eval-form-drawer.component';
import { AddDepartmentDetailsDrawerComponent } from '../apps/institution-list-demo/add-department-details-drawer/add-department-details-drawer.component';
import { EditInstitutionDetailsDrawerComponent } from '../apps/institution-list-demo/edit-institution-details-drawer/edit-institution-details-drawer.component';
import { AddEditWishlistComponent } from '../apps/placement/pages/add-edit-wishlist/add-edit-wishlist.component';
import { EditSlotComponent } from '../apps/placement/pages/edit-slot/edit-slot.component';
import { PerformPlacementComponent } from '../apps/placement/pages/perform-placement/perform-placement.component';
import { AddSlotComponent } from '../apps/placemet/pages/add-slot/add-slot.component';
import { StaticRoleConfigurationDrawerDemoComponent } from '../apps/static-role-configuration-page/static-role-configuration-drawer-demo/static-role-configuration-drawer-demo.component';
import { AddInstitutionDrawerComponent } from '../apps/tenant-onboarding-demo/add-institution-drawer/add-institution-drawer.component';
import { TenantOnboardingEditColumnsComponent } from '../apps/tenant-onboarding-demo/tenant-onboarding-edit-columns/tenant-onboarding-edit-columns.component';
import { FilterAndEditDrawerComponent } from '../apps/the-complete-demo-page/filter-and-edit-drawer/filter-and-edit-drawer.component';
import { FilterDrawerComponent } from '../apps/the-complete-demo-page/filter-drawer/filter-drawer.component';
import { ShowMoreFilterDrawerComponent } from '../apps/the-complete-demo-page/show-more-filter-drawer/show-more-filter-drawer.component';

@Injectable({providedIn: 'any'})
export class UXDemoDrawerService extends ComponentMap {
  constructor() {
    super();
    this.add('ryzen-edit-slot', EditSlotComponent);
    this.add('ryzen-add-slot', AddSlotComponent);
    this.add('ryzen-perform-placement', PerformPlacementComponent);
    this.add('ryzen-add-edit-wishlist', AddEditWishlistComponent);
    this.add('ryzen-filter-drawer', FilterDrawerComponent);
    this.add('ryzen-filter-and-edit-drawer', FilterAndEditDrawerComponent);
    this.add(
      'ryzen-associate-clinical-instructor-drawer',
      AssociateClinicalInstructorDrawerComponent
    );
    this.add('zhealthcare-app-preview-demo-content', PreviewDemoContentComponent);
    this.add('ryzen-add-institution-drawer', AddInstitutionDrawerComponent);
    this.add(
      'ryzen-tenant-onboarding-edit-columns',
      TenantOnboardingEditColumnsComponent
    );
    this.add(
      'ryzen-edit-institution-details-drawer',
      EditInstitutionDetailsDrawerComponent
    );
    this.add(
      'ryzen-add-department-details-drawer',
      AddDepartmentDetailsDrawerComponent
    );
    this.add('ryzen-add-records-drawer-demo', AddRecordsDrawerDemoComponent);
    this.add('ryzen-view-instruction-demo', ViewInstructionDemoComponent);
    this.add(
      'ryzen-static-role-configuration-drawer-demo',
      StaticRoleConfigurationDrawerDemoComponent
    );
    this.add(
      'ryzen-frequency-based-eval-form-drawer',
      FrequencyBasedEvalFormDrawerComponent
    );
    this.add('ryzen-show-more-filter-drawer', ShowMoreFilterDrawerComponent);
    this.add('ryzen-drawer-with-table', DrawerWithTableComponent);
    this.add('ryzen-drawer-with-sections', DrawerWithSectionsComponent);
    this.add('create-new-standard-form', createNewStandardFormComponent);
    this.add('add-form-drawer', AddFormDrawerComponent);
    this.add('add-benchmark', addBenchmarkComponent);
  }
}
