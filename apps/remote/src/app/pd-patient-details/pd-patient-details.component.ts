import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '@zhealthcare/ux';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'pd-patient-details',
  templateUrl: 'pd-patient-details.component.html'
})

export class PdPatientDetailsComponent {

  constructor(_headerService:HeaderService,
      private activatedRoute: ActivatedRoute,
      private readonly patientService: PatientService
     ) {
    this.activatedRoute.params.subscribe(x=> {
      this.patientService.getPatientById(x.id).subscribe();
    });
  }

}
