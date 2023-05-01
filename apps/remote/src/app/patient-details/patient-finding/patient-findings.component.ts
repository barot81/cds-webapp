import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { PatientFormsService } from '../../forms/patient-forms.service';
import { Finding } from '../../models/Finding.model';
import { PatientFindingService } from '../../services/patient-finding.service';

@Component({
  selector: 'patient-findings',
  templateUrl: 'patient-findings.component.html',
})
export class PatientFindingsComponent implements OnInit {
  loading$: any;
  patientFinding$: Subject<Finding> = new BehaviorSubject(new Finding());
  patientInfo: Finding;
;
  constructor(
    public _patientFormService: PatientFormsService,
    private activatedRoute: ActivatedRoute,
    private patientFindingService: PatientFindingService
  ) {
    this.loading$ = this.patientFindingService.loading$;
    this.loading$.next(true);
    this.activatedRoute.params.subscribe((x) => {
      this.patientFindingService.getPatientFindingById(x.id).subscribe((res) => {
        this.patientInfo = res;
        this.patientFinding$.next(res);
        this.loading$.next(false);
      });
    });
  }

  ngOnInit() {}
}
