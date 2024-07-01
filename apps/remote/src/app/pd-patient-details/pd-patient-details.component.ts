import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '@zhealthcare/ux';
import { AuditorPatientService } from '../services/auditor-patient.service';

@Component({
  selector: 'pd-patient-details',
  templateUrl: 'pd-patient-details.component.html'
})

export class PdPatientDetailsComponent {

  constructor(_headerService:HeaderService,
      private activatedRoute: ActivatedRoute,
      private readonly auditorService: AuditorPatientService
     ) {
    this.activatedRoute.params.subscribe(x=> {
      this.auditorService.getPatientById(x.id).subscribe();
    });
  }

}
