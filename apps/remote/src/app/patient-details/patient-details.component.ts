import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'patient-details',
  templateUrl: 'patient-details.component.html'
})

export class PatientDetailsComponent implements OnInit {
  patient$: any;
  loading$: any;
  constructor(private activatedRoute: ActivatedRoute, private patientService: PatientService) {
    // this.activatedRoute.params.subscribe(x=> {
    //   this.patientService.getPatientById(x.id).subscribe(x=> {
    //       this.patient$.next(x);
    //       this.loading$.next(false);
    //   })
    // });
  }

  ngOnInit() { }
}
