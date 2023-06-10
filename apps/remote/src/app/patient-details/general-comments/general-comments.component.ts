import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { PatientFormsService } from '../../forms/patient-forms.service';
import { GeneralComment } from '../../models/general-comments.model';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'patients-general-comments',
  templateUrl: 'general-comments.component.html',
})
export class GeneralCommentsComponent implements OnInit, OnDestroy {
  loading$: any;
  generalComments$: Subject<GeneralComment> = new BehaviorSubject(
    new GeneralComment()
  );
  patientInfo: Patient;
  _unsubscribe: Subject<any> = new Subject();
  patientId: any;
  constructor(
    public _patientFormService: PatientFormsService,
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService
  ) {
    this.loading$ = this.patientService.loading$;
    this.loading$.next(true);
    this.activatedRoute.params.subscribe((x) => {
      this.patientId = x.id;
      this.patientService.getPatientById(x.id).subscribe((res) => {
        if(res) {
          this.patientInfo = res;
          this.generalComments$.next(res.generalComment);
        }
        this.loading$.next(false);
      });
    });
  }

  ngOnInit() {
    this.patientService.patientData$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(patients => {
        const selectedPatient = patients.find(x=>x.id === this.patientId);
        if(selectedPatient) {
          selectedPatient.generalComment.comments = selectedPatient.generalComment.comments ?? '-';
          this.generalComments$.next(selectedPatient.generalComment);
          this.patientInfo.reviewStatus = selectedPatient.reviewStatus;
        }
    });

    this.patientService.updatedStatus$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((status) => {
        this.patientInfo.reviewStatus = status;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

}
