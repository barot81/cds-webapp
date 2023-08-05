import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  FusionFormAdapter,
  FusionFormComponent,
} from '@zhealthcare/fusion/components';
import { DrawerService, SnackbarService } from '@zhealthcare/ux';
import { BehaviorSubject,  Subject, takeUntil } from 'rxjs';
import { Finding } from '../../models/Finding.model';
import { DrgLookup } from '../../models/lookup.models';
import { Patient } from '../../models/patient.model';
import { LookupService } from '../../services/lookup.service';
import { PatientFindingService } from '../../services/patient-finding.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'add-patient-finding',
  templateUrl: 'add-patient-finding.component.html',
  styleUrls: ['add-patient-finding.component.scss'],
})
export class AddPatientFindingComponent
  extends FusionFormComponent
  implements OnInit, AfterViewInit, FusionFormAdapter, OnDestroy
{
  protected _onDestroy = new Subject<void>();

  queryDiagnosisList: string[];
  physicianNameList: string[];
  clinicalIndicatorList: string[];
  statusList: string[];
  queryTypeList: string[];
  responseTypeList: string[];
  maxDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  patientFindingInfo: Finding;
  patientId: string;
  drgLookup: DrgLookup[] = [];
  PatientInfo: Patient;
  loading = false;
  drgLookups$ : Subject<DrgLookup[]> = new BehaviorSubject([]);
  constructor(
    private readonly fb: FormBuilder,
    private _drawerService: DrawerService,
    private _snackBarService: SnackbarService,
    private _datepipe: DatePipe,
    private patientService: PatientService,
    private patientFindingService: PatientFindingService,
    private lookupService: LookupService
  ) {
    super();
    // this.fusionFormGroup = this.fb.group({
    //   queryType: new FormControl('Quality'),
    //   cdsName: new FormControl('Vishal'),
    //   queryDate: new FormControl(new Date('05/01/2023')),
    //   queryDiagnosis: new FormControl('Encephalopathy-AMS'),
    //   physicianName: new FormControl('FARUKHI MOHAMMAD U'),
    //   clinicalIndicator: new FormControl('strong'),
    //   currentDrgNo: new FormControl('191'),
    //   currentDrgDescription: new FormControl('CHRONIC OBSTRUCTIVE PULMONARY DISEASE WITH CC'),
    //   initialWeight: new FormControl('1.19'),
    //   gmlos: new FormControl('4.35'),
    //   expectedDrgNo: new FormControl('190-3'),
    //   expectedDrgDescription: new FormControl('ACUTE MYOCARDIAL INFARCTION'),
    //   expectedWeight: new FormControl('2.11'),
    //   expectedGmlos: new FormControl('6.30'),
    //   responseDate: new FormControl(new Date('01/01/2023')),
    //   responseType: new FormControl('Neutral'),
    //   responseComment: new FormControl(''),
    //   followupComment: new FormControl(''),
    //   revisedDrgNo: new FormControl('190-4'),
    //   revisedDrgDescription: new FormControl('ACUTE MYOCARDIAL INFARCTION '),
    //   revisedWeight: new FormControl('3.02'),
    //   revisedGmlos: new FormControl('12.34'),
    //   weightDifference: new FormControl('1.83'),
    //   queryStatus: new FormControl('Pending'),
    //   clinicalSummary: new FormControl(''),
    //   comments: new FormControl(''),
    // });

    this.fusionFormGroup = this.fb.group({
      queryType: new FormControl('', Validators.required),
      cdsName: new FormControl('Vishal'),
      queryDate: new FormControl(new Date()),
      queryDiagnosis: new FormControl(''),
      physicianName: new FormControl(''),
      clinicalIndicator: new FormControl(''),
      currentDrgNo: new FormControl(''),
      currentDrgSearch: new FormControl(''),
      currentDrgDescription: new FormControl(''),
      initialWeight: new FormControl(''),
      gmlos: new FormControl(''),
      expectedDrgNo: new FormControl(''),
      expectedDrgSearch: new FormControl(''),
      expectedDrgDescription: new FormControl(''),
      expectedWeight: new FormControl(''),
      expectedGmlos: new FormControl(''),
      responseDate: new FormControl(''),
      responseType: new FormControl('', Validators.required),
      responseComment: new FormControl(''),
      followupComment: new FormControl(''),
      revisedDrgNo: new FormControl(''),
      revisedDrgSearch: new FormControl(''),
      revisedDrgDescription: new FormControl(''),
      revisedWeight: new FormControl(''),
      revisedGmlos: new FormControl(''),
      weightDifference: new FormControl(''),
      queryStatus: new FormControl('', Validators.required),
      clinicalSummary: new FormControl(''),
      comments: new FormControl(''),
    });

    this.queryTypeList = ['CDI', 'Coding', 'Quality', 'Case Management'];
    this.queryDiagnosisList = [];
    this.physicianNameList = [];
    this.clinicalIndicatorList = ['Strong', 'Weak'];
    this.responseTypeList = ['Neutral', 'Progressive', 'No Response'];
    this.statusList = [
      'Pending',
      'Answered',
      'Completed',
      'Dropped',
      'No Response',
    ];
  }

  ngOnInit() {
    this.loading = true;
    this.patientId = this.routeParam.params['id'];

    this.fusionFormGroup.get('currentDrgSearch').valueChanges
    .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDrgs('currentDrgSearch');
      });


    this.fusionFormGroup.get('expectedDrgSearch').valueChanges
    .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDrgs('expectedDrgSearch');
      });


    this.fusionFormGroup.get('revisedDrgSearch').valueChanges
    .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDrgs('revisedDrgSearch');
      });
    this.lookupService.getPhycianNames().subscribe((x) => this.physicianNameList = x);
    this.lookupService.getDiagnosisLookup().subscribe((x) =>
      this.queryDiagnosisList = x.items.map((x) => x.name)
    );

    this.patientService.getPatientById(this.patientId).subscribe(
      patient => {
        this.PatientInfo = patient;
        this.lookupService.getDrgLookup(patient.reimbursementType)
        .subscribe((x) => {
          this.drgLookup = x;
          this.loading = false;
          this.drgLookups$.next(x.slice());
        });
      }
    );
  }


  protected filterDrgs(formControlName: string) {
    if (!this.drgLookup) {
      return;
    }
    let search = this.fusionFormGroup.get(formControlName).value;
    if (!search) {
      this.drgLookups$.next(this.drgLookup.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.drgLookups$.next(
      this.drgLookup.filter(x => x.no.toLowerCase().indexOf(search) > -1)
    );
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.fusionFormGroup.patchValue(this.data);
    }
  }

  isOptionTruncated(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      const isBig = elem.scrollWidth > elem.clientWidth;
      if (isBig) {
        const optionText = Array.from(
          elem.getElementsByClassName(
            'mat-option-text '
          ) as HTMLCollectionOf<HTMLElement>
        );
        optionText[0].style.overflow = 'hidden !important';
        optionText[0].style.textOverflow = 'ellipsis !important';
        optionText[0].style.display = 'initial !important';
      }
      return isBig;
    } else {
      return false;
    }
  }

  OnClinicalIndicatorChanged(clinicalIndicator) {
    if (
      clinicalIndicator.value !== null &&
      clinicalIndicator.value !== undefined
    ) {
      this.fusionFormGroup.controls['clinicalIndicator'].setValue(
        clinicalIndicator.value
    );
    }
  }
  OnQueryTypeChanged(queryType) {
    if (queryType.value !== null && queryType.value !== undefined) {
      this.fusionFormGroup.controls['queryType'].setValue(queryType.value);
    }
  }

  onDrgChange(drgNo) {
    const selectedDrg = this.drgLookup.find((x) => x.no === drgNo.value);
    this.fusionFormGroup.patchValue({
      currentDrgNo: selectedDrg.no,
      currentDrgDescription: selectedDrg.title,
      initialWeight: selectedDrg.weight,
      gmlos: selectedDrg.gmlos,
    });
  }

  onExpectedDrgChange(expecteddrgNo) {
    const selectedDrg = this.drgLookup.find(
      (x) => x.no === expecteddrgNo.value
    );
    this.fusionFormGroup.patchValue({
      expectedDrgNo: selectedDrg.no,
      expectedDrgDescription: selectedDrg.title,
      expectedWeight: selectedDrg.weight,
      expectedGmlos: selectedDrg.gmlos,
    });
  }

  onEndingDrgChange(endingDrgNo) {
    const selectedDrg = this.drgLookup.find(
      (x) => x.no === endingDrgNo.value
    );
    this.fusionFormGroup.patchValue({
      revisedDrgNo: selectedDrg.no,
      revisedDrgDescription: selectedDrg.title,
      revisedWeight: selectedDrg.weight,
      revisedGmlos: selectedDrg.gmlos,
      weightDifference: +selectedDrg.weight - +this.fusionFormGroup.controls['initialWeight'].value,
    });
  }

  OnPhysicianNameChanged(physicianName) {
    if (physicianName.value !== null && physicianName.value !== undefined) {
      this.fusionFormGroup.controls['physicianName'].setValue(
        physicianName.value
      );
    }
  }
  OnQueryDiagnosisChanged(queryDiagnosis) {
    if (queryDiagnosis.value !== null && queryDiagnosis.value !== undefined) {
      this.fusionFormGroup.controls['queryDiagnosis'].setValue(
        queryDiagnosis.value
      );
    }
  }
  OnStatusChanged(status) {
    if (status.value !== null && status.value !== undefined) {
      this.fusionFormGroup.controls['queryStatus'].setValue(status.value);
    }
  }
  OnResponseTypeChanged(responseType) {
    if (responseType.value !== null && responseType.value !== undefined) {
      this.fusionFormGroup.controls['responseType'].setValue(
        responseType.value
      );
    }
  }

  primaryAction() {
    if (this.fusionFormGroup.invalid) {
      this._drawerService.setPrimaryActionState(true, false);
      return;
    }

    if (
      this.fusionFormGroup.value.queryDate !== null &&
      this.fusionFormGroup.value.queryDate !== ''
    ) {
      this.fusionFormGroup.value.queryDate = this._datepipe.transform(
        this.fusionFormGroup.value.queryDate,
        'yyyy-MM-dd'
      );
    }
    if (
      this.fusionFormGroup.value.responseDate !== null &&
      this.fusionFormGroup.value.responseDate !== ''
    ) {
      this.fusionFormGroup.value.responseDate = this._datepipe.transform(
        this.fusionFormGroup.value.responseDate,
        'yyyy-MM-dd'
      );
    }
    this.patientFindingInfo = { ...this.fusionFormGroup.value };
    this.patientFindingInfo.facilityId = localStorage.getItem('FacilityId');
    this.patientFindingInfo.patientId = this.patientId;
    this._drawerService.setPrimaryActionState(false, true);
    if (this.data) {
      this.patientFindingInfo.id = this.data.id;
      this.editExistingPatientFinding();
    } else {
      this.addNewPatientFinding();
    }
  }
  addNewPatientFinding() {
    this.patientFindingService
      .addPatientFinding(this.patientId, this.patientFindingInfo)
      .subscribe((response) => {
        if (response) {
          this.updateReviewStatus();
          this._snackBarService.openCustomSnackBar(
            {
              message: 'Patient Finding Added Successfully.',
              icon: 'fa-check s-18',
            },
            3000,
            'snackbar-success'
          );
          this._drawerService.closeDrawer();
        }
      });
  }
  editExistingPatientFinding() {
    this.patientFindingService
      .updatePatientFinding(this.patientId, this.patientFindingInfo)
      .subscribe((response) => {
        if (response) {
          this.updateReviewStatus();

          this._snackBarService.openCustomSnackBar(
            {
              message: 'Patient Finding Updated Successfully.',
              icon: 'fa-check s-18',
            },
            3000,
            'snackbar-success'
          );
          this._drawerService.closeDrawer();
        }
      });
  }
  private updateReviewStatus() {
    const reviewStatus = this.patientFindingInfo.queryStatus === 'Pending'
      ? 'Pending Query'
      : 'Reviewed';

    if (reviewStatus)
      this.patientService.updaetReviewStatus(this.patientId, reviewStatus).subscribe();
  }

  secondaryAction() {}
  panelClose() {}

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
