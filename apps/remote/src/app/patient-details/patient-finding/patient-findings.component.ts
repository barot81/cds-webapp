import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { PatientFormsService } from '../../forms/patient-forms.service';
import { Finding } from '../../models/Finding.model';
import { PatientFindingService } from '../../services/patient-finding.service';

@Component({
  selector: 'patient-findings',
  templateUrl: 'patient-findings.component.html',
})
export class PatientFindingsComponent implements OnInit {
  loading$: any;
  patientFindings$: Subject<Finding[]> = new BehaviorSubject([]);
  patientInfo: Finding;
  patientId: any;
  _unsubscribe: Subject<any> = new Subject();

  constructor(
    public _patientFormService: PatientFormsService,
    private activatedRoute: ActivatedRoute,
    private patientFindingService: PatientFindingService
  ) {
    this.loading$ = this.patientFindingService.loading$;
    this.loading$.next(true);
    this.activatedRoute.params.subscribe((x) => {
      this.patientId = x.id;
      this.patientFindingService.getPatientFindingsByPatientId(this.patientId).subscribe((res) => {
        this.patientFindings$.next(res);
        this.loading$.next(false);
      });
      this.patientFindingService.patientFindingData$.pipe(takeUntil(this._unsubscribe),
      map(x=> this.patientFindings$.next(x))).subscribe();
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
