import { ChangeDetectionStrategy, Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { PatientFormsService } from '../../forms/patient-forms.service';
import { Finding } from '../../models/Finding.model';
import { PatientFindingService } from '../../services/patient-finding.service';
import { PatientService } from '../../services/patient.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'patient-findings',
  templateUrl: 'patient-findings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientFindingsComponent implements OnInit {
  loading$: any;
  patientFindings$: Subject<Finding[]> = new BehaviorSubject([]);
  patientFindingInfo: Finding;
  patientId: any;
  _unsubscribe: Subject<any> = new Subject();
  patientInfo: any;

  constructor(
    public _patientFormService: PatientFormsService,
    private activatedRoute: ActivatedRoute,
    private patientFindingService: PatientFindingService,
    private lookupService: LookupService,
    private patientService: PatientService
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
  InitialzeLookup() {
    this.lookupService.getPhycianNames().subscribe();
    this.lookupService.getDiagnosisLookup().subscribe();
    this.patientService.getPatientById(this.patientId)
    .subscribe(patient =>
       this.lookupService.getDrgLookup(patient.reimbursementType).subscribe()
    );
  }

  ngOnInit() {  }
  // this.InitialzeLookup();

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
