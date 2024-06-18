import { ChangeDetectionStrategy, Component,  Input,  OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { PatientFormsService } from '../../forms/patient-forms.service';
import { Finding } from '../../models/Finding.model';
import { QueryFindingService } from '../../services/query-finding.service';
import { PatientService } from '../../services/patient.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'patient-findings',
  templateUrl: 'patient-findings.component.html',
  styleUrls:['patient-findings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientFindingsComponent implements OnDestroy {
  loading$: any;
  patientFindings$: Subject<Finding[]> = new BehaviorSubject([]);
  patientFindingInfo: Finding;
  patientId: any;
  _unsubscribe: Subject<any> = new Subject();
  patientInfo: any;
  @Input('isReadonly') isReadonly = false;
  constructor(
    public _patientFormService: PatientFormsService,
    private activatedRoute: ActivatedRoute,
    private patientFindingService: QueryFindingService,
    private lookupService: LookupService,
    private patientService: PatientService
  ) {
    this.loading$ = this.patientFindingService.loading$;
    this.loading$.next(true);
    this.activatedRoute.params.subscribe((x) => {
      this.patientId = x.id;
      this.patientFindingService.getFindingsByPatientId(this.patientId).subscribe((res) => {
        this.patientFindings$.next(res);
        this.loading$.next(false);
      });
      this.patientFindingService.queryFindingData$.pipe(takeUntil(this._unsubscribe),
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
  // this.InitialzeLookup();


  displayTextAreaContent(content: string) {
    return content.replace(/\n/g, '<br>');
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
