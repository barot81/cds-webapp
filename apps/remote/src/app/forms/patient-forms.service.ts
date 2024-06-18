import { Injectable } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { AddGeneralCommentsComponent } from './add-general-comments/add-general-comments.component';
import { AddQueryFindingComponent } from './add-query-finding/add-query-finding.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddAuditorFindingComponent } from './add-auditor-finding/add-auditor-finding.component';

@Injectable({providedIn: 'any'})
export class PatientFormsService extends ComponentMap {

  constructor() {
    super();

    this.add('patient-add-form', AddPatientComponent);
    this.add('patient-general-comments-form', AddGeneralCommentsComponent);
    this.add('query-finding-form', AddQueryFindingComponent);
    this.add('auditor-finding-form', AddAuditorFindingComponent);

  }
}

