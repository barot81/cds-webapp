import { Injectable } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { AddPatientComponent } from './add-patient/add-patient.component';
// import { BulkUpdateComponent } from './bulk-update/bulk-update.component';
// import { AreaOfProfessionalInterestFilterComponent } from './filters/area-of-professional-interest-filter/area-of-professional-interest-filter.component';
// import { ProfileGridFiltersComponent } from './filters/grid-filters/grid-filters.component';
// import { StudentShowMoreComponent } from './filters/show-more/show-more.component';
// import { StudentLandingGridFilterComponent } from './filters/student-landing-grid-filter/student-landing-grid-filter.component';

@Injectable({providedIn: 'any'})
export class PatientFormsService extends ComponentMap {

  constructor() {
    super();

    //share-profile
    // this.add('profile-shared-site-form', ShareWithSiteComponent);
    // this.add('profile-profile-share-history', ProfileShareHistoryComponent);

    //filters
    //this.add('profile-student-landing-grid-filter-form', StudentLandingGridFilterComponent);
    // this.add('profile-area-of-professional-interest-filter-form', AreaOfProfessionalInterestFilterComponent);
    // this.add('profile-grid-filters-form', ProfileGridFiltersComponent);

    //add-student
    this.add('patient-add-form', AddPatientComponent);

    // //bulk-update
    // this.add('profile-admin-bulk-update-form', BulkUpdateComponent)

    // //showmore
    // this.add('profile-show-more', StudentShowMoreComponent)

  }
}

