import { ChangeDetectionStrategy, Component,  OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { PatientFormsService } from '../../forms/patient-forms.service';
import { Finding } from '../../models/Finding.model';
import { PatientService } from '../../services/patient.service';
import { LookupService } from '../../services/lookup.service';
import { AuditorFindingService } from '../../services/auditor-finding.service';

@Component({
  selector: 'auditor-findings',
  templateUrl: 'auditor-findings.component.html',
  styleUrls:['auditor-findings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditorFindingsComponent implements OnDestroy {
  loading$: any;
  patientFindings$: Subject<Finding[]> = new BehaviorSubject([]);
  findingCount = 0;
  patientFindingInfo: Finding;
  patientId: any;
  _unsubscribe: Subject<any> = new Subject();
  patientInfo: any;

  constructor(
    public _patientFormService: PatientFormsService,
    private activatedRoute: ActivatedRoute,
    private auditorFindingService: AuditorFindingService,
    private lookupService: LookupService,
    private patientService: PatientService
  ) {
    this.loading$ = this.auditorFindingService.loading$;
    this.loading$.next(true);
    this.activatedRoute.params.subscribe((x) => {
      this.patientId = x.id;
      this.auditorFindingService.getFindingsByPatientId(this.patientId).subscribe((res) => {
        this.findingCount = res.length;
        this.patientFindings$.next(res);
        this.loading$.next(false);
      });
      this.auditorFindingService.auditorFindingData$.pipe(takeUntil(this._unsubscribe),
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


  displayTextAreaContent(content: string){
    return content.replace(/\n/g, '<br>');
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
