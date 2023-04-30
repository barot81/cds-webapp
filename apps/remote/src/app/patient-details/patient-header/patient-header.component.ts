import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileConfiguration, FileEndpoint } from '@zhealthcare/plugin/file-upload';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
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
  firstInitial: any;
  lastInitial: any;

  constructor(private activatedRoute: ActivatedRoute, private patientService: PatientService) {
    this.loading$ = this.patientService.loading$;
    this.activatedRoute.params.subscribe(x=> {
      this.patientService.getPatientById(x.id).subscribe(x=>{
          this.patient$.next(x);
          this.loading$.next(false);
      })
    });
  }

  setInitials(patient) {
    if (patient.firstName) {
      this.firstInitial = patient.firstName.charAt(0).toUpperCase();
    }

    if (patient.lastName) {
      this.lastInitial = patient.lastName.charAt(0).toUpperCase();
    }
  }
}
