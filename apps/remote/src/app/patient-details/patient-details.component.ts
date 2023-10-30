import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '@zhealthcare/ux';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'patient-details',
  templateUrl: 'patient-details.component.html'
})

export class PatientDetailsComponent {

  constructor(_headerService:HeaderService,
      private activatedRoute: ActivatedRoute,
      private readonly patientService: PatientService
     ) {
    this.activatedRoute.params.subscribe(x=> {
      this.patientService.getPatientById(x.id).subscribe();
    });
  }

}
