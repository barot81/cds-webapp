import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FusionFormAdapter,
  FusionFormComponent,
} from '@zhealthcare/fusion/components';
import { UserService } from '@zhealthcare/fusion/core';
import { DrawerService, LayoutService, SnackbarService } from '@zhealthcare/ux';
import { BehaviorSubject,  Subject, takeUntil } from 'rxjs';
import { Finding } from '../../models/Finding.model';
import { DrgLookup } from '../../models/lookup.models';
import { Patient } from '../../models/patient.model';
import { LookupService } from '../../services/lookup.service';
import { PatientService } from '../../services/patient.service';
import { AuditorFindingService } from '../../services/auditor-finding.service';

@Component({
  selector: 'add-auditor-finding',
  templateUrl: 'add-auditor-finding.component.html',
  styleUrls: ['add-auditor-finding.component.scss']
})
export class AddAuditorFindingComponent
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
  enabledQueryBasedValidation = true;
  isCodingSuggestion = false;
  isNonDrgCodingSuggestion = false;
  constructor(
    private readonly fb: FormBuilder,
    private _drawerService: DrawerService,
    private _snackBarService: SnackbarService,
    private _datepipe: DatePipe,
    private patientService: PatientService,
    private auditorFindingService: AuditorFindingService,
    private lookupService: LookupService,
    private _userService: UserService,
    private _layoutService: LayoutService
  ) {
    super();
    const username = this._userService.getUserName() ??  this._layoutService.getUser()?.name;
    this.fusionFormGroup = this.fb.group({
      queryType: new FormControl('', Validators.required),
      cdsName: new FormControl(username),
      queryDate: new FormControl(new Date()),
      queryDiagnosis: new FormControl(''),
      physicianName: new FormControl(''),
      clinicalIndicator: new FormControl(''),
      currentDrgNo: new FormControl(''),
      currentDrgSearch: new FormControl(''),
      currentDrgDescription: new FormControl(''),
      initialWeight: new FormControl(),
      gmlos: new FormControl(),
      expectedDrgNo: new FormControl(''),
      expectedDrgSearch: new FormControl(''),
      expectedDrgDescription: new FormControl(''),
      expectedWeight: new FormControl(),
      expectedGmlos: new FormControl(),
      isCoderAgreed: new FormControl(false),
      responseDate: new FormControl(),
      responseType: new FormControl('', Validators.required),
      responseComment: new FormControl(''),
      followupComment: new FormControl(''),
      revisedDrgNo: new FormControl(''),
      revisedDrgSearch: new FormControl(''),
      revisedDrgDescription: new FormControl(''),
      revisedWeight: new FormControl(),
      revisedGmlos: new FormControl(),
      weightDifference: new FormControl(),
      queryStatus: new FormControl('', Validators.required),
      clinicalSummary: new FormControl(''),
      comments: new FormControl(''),
    });

    this.queryTypeList = ['CDI', 'Coding Suggestion - No Drg Change','Coding Suggestion - Drg Change', 'Quality', 'Case Management'];
    this.queryDiagnosisList = [];
    this.physicianNameList = [];
    this.clinicalIndicatorList = ['Strong', 'Weak'];
    this.responseTypeList = ['Neutral', 'Progressive', 'No Response'];
    this.statusList = [
      'Pending',
      'Answered',
      'Dropped'
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

    this.patientService.currentPatient$.pipe(takeUntil(this._onDestroy))
    .subscribe(patient => {
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

  onQueryStatusChanged() {
    this.fusionFormGroup.get('queryStatus')?.valueChanges.subscribe((queryStatus) => {

      this.enabledQueryBasedValidation = false;
      const responseDateControl = this.fusionFormGroup.get('responseDate');
      const responseTypeControl = this.fusionFormGroup.get('responseType');
      const responseCommentControl = this.fusionFormGroup.get('responseComment');
      const revisedDrgNoControl = this.fusionFormGroup.get('revisedDrgNo');
      responseDateControl?.clearValidators();
      responseTypeControl?.clearValidators();
      responseCommentControl?.clearValidators();
      revisedDrgNoControl?.clearValidators();

      if (queryStatus !== 'Pending' && !this.isCodingSuggestion) {
        this.enabledQueryBasedValidation = true;
        responseDateControl?.setValidators(Validators.required);
        responseTypeControl?.setValidators(Validators.required);
        responseCommentControl?.setValidators(Validators.required);
        revisedDrgNoControl?.setValidators(Validators.required);
      }

      responseDateControl?.updateValueAndValidity();
      responseTypeControl?.updateValueAndValidity();
      responseCommentControl?.updateValueAndValidity();
      revisedDrgNoControl?.updateValueAndValidity();
    });
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
      this.onQueryStatusChanged();
      this.OnQueryTypeChanged(this.fusionFormGroup.get('queryType'));
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

  getInvalidControls(formGroup: FormGroup): FormControl[] {
    const invalidControls: FormControl[] = [];

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl && control.invalid) {
        invalidControls.push(control);
      } else if (control instanceof FormGroup) {
        invalidControls.push(...this.getInvalidControls(control));
      }
    });

    return invalidControls;
  }

  checkInvalidControls(): void {
    const invalidControls = this.getInvalidControls(this.fusionFormGroup);
    console.log('Invalid Controls:', invalidControls);
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
    if(queryType.value.includes('Coding Suggestion')) {
      this.isCodingSuggestion = true;
      this.fusionFormGroup.get('queryDiagnosis')?.clearValidators();
      this.fusionFormGroup.get('clinicalIndicator')?.clearValidators();
      this.fusionFormGroup.get('physicianName')?.clearValidators();
    } else {
      this.isCodingSuggestion = false;
      this.fusionFormGroup.get('queryDiagnosis')?.setValidators(Validators.required);
      this.fusionFormGroup.get('clinicalIndicator')?.setValidators(Validators.required);
      this.fusionFormGroup.get('physicianName')?.setValidators(Validators.required);
    }
    if(queryType.value.includes('No Drg Change')) {
        this.isNonDrgCodingSuggestion = true;
        this.fusionFormGroup.get('revisedDrgNo').clearValidators();
    } else {
        this.isNonDrgCodingSuggestion = false;
        this.fusionFormGroup.get('revisedDrgNo').setValidators(Validators.required);
    }
    if (queryType.value) {
      this.fusionFormGroup.controls['queryType'].setValue(queryType.value);
    }

    this.checkInvalidControls();
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
      this.patientFindingInfo.id ??= this.data?.id;
      this.updateQueryFinding();
    } else {
      this.addQueryFinding();
    }
  }
  addQueryFinding() {
    this.auditorFindingService
      .addPatientFinding(this.patientId, this.patientFindingInfo)
      .subscribe((response) => {
        if (response) {
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
  updateQueryFinding() {
    this.auditorFindingService
      .updatePatientFinding(this.patientId, this.patientFindingInfo)
      .subscribe((response) => {
        if (response) {
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
  secondaryAction() {}
  panelClose() {}

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
