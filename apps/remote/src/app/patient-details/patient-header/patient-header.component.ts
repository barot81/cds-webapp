import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Patient } from '../../models/patient.model';
import { GridService } from '../../services/grid.service';
import { PatientService } from '../../services/patient.service';
import { AuditorPatientService } from '../../services/auditor-patient.service';

@Component({
  selector: 'patient-header',
  templateUrl: 'patient-header.component.html',
  styleUrls :  ['./patient-header.component.scss']
})

export class PatientHeaderComponent implements OnDestroy, OnInit {
  patient$: Subject<Patient> = new BehaviorSubject(new Patient());
  public loading$;
  fileConfiguration;
  initial2;
  initial1;
  private _unsubscribe = new Subject();
  @Input() isPdPatient = false;
  constructor(private patientService: PatientService, public gridService:GridService,
    private auditorPatientService: AuditorPatientService
  ) {
    this.loading$ = this.patientService.loading$;
  }
  ngOnInit(): void {
    (this.isPdPatient
      ? this.auditorPatientService.currentPdPatient$
      : this.patientService.currentPatient$)
    .pipe(takeUntil(this._unsubscribe))
    .subscribe(x=> {
        this.patient$.next(x);
        this.loading$.next(false);
        this.setInitials(x.patientName);
    });
  }


  setInitials(patientName: string) {
    if (patientName) {
      const patientArr = patientName.split(' ');
      this.initial1 = patientArr[1]?.charAt(0)?.toUpperCase() ?? '';
      this.initial2 = patientArr[0]?.charAt(0)?.toUpperCase() ?? '';
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
