import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { PatientFormsService } from '../../forms/patient-forms.service';
import { GeneralComment } from '../../models/general-comments.model';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'patients-general-comments',
  templateUrl: 'general-comments.component.html',
  styleUrls: ['./general-comments.component.scss'],
})
export class GeneralCommentsComponent implements OnInit, OnDestroy {
  loading$: any;
  showMore = true;
  patientInfo: Patient;
  folloupComments: GeneralComment[] = [];
  allComments: GeneralComment[] = [];
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
        if (res) {
          this.patientInfo = res;
          this.setGeneralComments(res);
        }
        this.loading$.next(false);
      });
    });
  }

  private setGeneralComments(res: Patient) {
    this.allComments = res.followUpComments
      .sort((a, b) =>  new Date(b.addedOn).getTime() -  new Date(a.addedOn).getTime()) || [];
    this.folloupComments = this.allComments.slice(0, 2);
  }

  ngOnInit() {
    this.patientService.patientData$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((patients) => {
        const selectedPatient = patients.find((x) => x.id === this.patientId);
        if (selectedPatient) {
          this.setGeneralComments(selectedPatient);
          if (this.patientInfo)
            this.patientInfo.reviewStatus = selectedPatient.reviewStatus;
        }
      });

    this.patientService.updatedStatus$
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((status) => {
        if (this.patientInfo) this.patientInfo.reviewStatus = status;
      });
  }

  onShowMoreClick() {
    this.showMore = false;
    this.folloupComments = this.allComments;
  }

  onShowlessClick() {
    this.showMore = true;
    this.folloupComments = this.allComments.slice(0, 2);
  }
  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
