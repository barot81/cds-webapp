import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { PatientFormsService } from '../../forms/patient-forms.service';
import { GeneralComments } from '../../models/general-comments.model';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'patients-general-comments',
  templateUrl: 'general-comments.component.html',
})
export class GeneralCommentsComponent implements OnInit {
  loading$: any;
  generalComments$: Subject<GeneralComments> = new BehaviorSubject(new GeneralComments());
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
        this.generalComments$.next(res.generalComment);
        this.loading$.next(false);
      });
    });
  }

  ngOnInit() {}
}
