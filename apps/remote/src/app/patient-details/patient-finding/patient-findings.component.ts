import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { PatientFormsService } from '../../forms/patient-forms.service';
import { Finding } from '../../models/Finding.model';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'patient-findings',
  templateUrl: 'patient-findings.component.html',
})
export class PatientFindingsComponent implements OnInit {
  loading$: any;
  patientFinding$: Subject<Finding> = new BehaviorSubject(new Finding());
  patientInfo: Patient;
;
  constructor(
    public _patientFormService: PatientFormsService,
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService
  ) {
    this.loading$ = this.patientService.loading$;
    this.loading$.next(true);
    this.activatedRoute.params.subscribe((x) => {
      this.patientService.getPatientById(x.id).subscribe((res) => {
        this.patientInfo = res;
        this.patientFinding$.next(res.generalComment);
        this.loading$.next(false);
      });
    });
  }

  ngOnInit() {}
}
