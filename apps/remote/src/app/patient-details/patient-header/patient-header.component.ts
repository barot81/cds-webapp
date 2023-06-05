import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'patient-header',
  templateUrl: 'patient-header.component.html',
  styleUrls :  ['./patient-header.component.scss']
})

export class PatientHeaderComponent {
  patient$: Subject<Patient> = new BehaviorSubject(new Patient());
  public loading$;
  fileConfiguration;
  initial2: any;
  initial1: any;

  constructor(private activatedRoute: ActivatedRoute, private patientService: PatientService) {
    this.loading$ = this.patientService.loading$;
    this.activatedRoute.params.subscribe(x=> {
      this.patientService.getPatientById(x.id).subscribe(x=>{
          this.patient$.next(x);
          this.loading$.next(false);
          this.setInitials(x.patientName);
      })
    });
  }

  setInitials(patientName: string) {
    if (patientName) {
      const patientArr = patientName.split(' ');
      this.initial1 = patientArr[1].charAt(0).toUpperCase();
      this.initial2 = patientArr[0].charAt(0).toUpperCase();
    }
  }
}
