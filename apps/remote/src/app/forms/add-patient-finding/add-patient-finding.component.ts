import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FusionFormAdapter,
  FusionFormComponent,
} from '@zhealthcare/fusion/components';
import { DrawerService, SnackbarService } from '@zhealthcare/ux';
import { Finding } from '../../models/Finding.model';
import { PatientFindingService } from '../../services/patient-finding.service';

@Component({
  selector: 'add-patient-finding',
  templateUrl: 'add-patient-finding.component.html',
  styleUrls: ['add-patient-finding.component.scss'],
})
export class AddPatientFindingComponent
  extends FusionFormComponent
  implements OnInit, AfterViewInit, FusionFormAdapter
{
  queryDiagnosisList: string[];
  physicianNameList: string[];
  clinicalIndicatorList: string[];
  statusList: string[];
  queryTypeList: string[];
  responseTypeList: string[];
  maxDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  patientFindingInfo: Finding;
  patientId: string;

  constructor(
    private readonly fb: FormBuilder,
    private _drawerService: DrawerService,
    private _snackBarService: SnackbarService,
    private _datepipe: DatePipe,
    private router: Router,
    private patientFindingService: PatientFindingService
  ) {
    super();
    this.fusionFormGroup = this.fb.group({
      queryType: new FormControl('Quality'),
      cdsName: new FormControl('Vishal'),
      queryDate: new FormControl(new Date('05/01/2023')),
      queryDiagnosis: new FormControl('Encephalopathy-AMS'),
      physicianName: new FormControl('FARUKHI MOHAMMAD U'),
      clinicalIndicator: new FormControl('strong'),
      currentDrg: new FormControl('190-3 - ACUTE MYOCARDIAL INFARCTION'),
      initialWeight: new FormControl('1.19'),
      gmlos: new FormControl('4.35'),
      expectedDrg: new FormControl('190-4 - ACUTE MYOCARDIAL INFARCTION'),
      expectedWeight: new FormControl('2.11'),
      expectedGmlos: new FormControl('6.30'),
      responseDate: new FormControl(new Date('01/01/2023')),
      responseType: new FormControl('Neutral'),
      responseComment: new FormControl(''),
      followupComment: new FormControl(''),
      revisedDrg: new FormControl('192-4 - CARDIAC CATHETERIZATION FOR OTHER NON-CORONARY CONDITIONS'),
      revisedWeight: new FormControl('3.02'),
      revisedGmlos: new FormControl('12.34'),
      weightDifference: new FormControl('1.83'),
      status: new FormControl('Pending'),
      clinicalSummary: new FormControl(''),
      comments: new FormControl(''),
    });

    this.queryTypeList = [
      'CDI',
      'Coding',
      'Quality',
      'Case Management'
    ];
    this.queryDiagnosisList = [
      'Chest pain etiology',
      'Foley Cath Link',
      'Malnutrition',
      'AKI etiology',
      'Debridement',
      'Encephalopathy-AMS'
    ];
    this.physicianNameList = [
      'HA Alvin N',
      'HABIB SALMA A',
      'Khamly Json Y',
      'LE Tammy H',
      'LE Walter',
      'LIO Hung H',
      'MYN Min',
      'FARUKHI MOHAMMAD U'
    ];
    this.clinicalIndicatorList = ['strong', 'Weak'];
    this.responseTypeList = ['Neutral', 'Progressive', 'No Response'];
    this.statusList = ['Pending', 'Answered', 'Completed', 'Dropped', 'No Response'];
  }

  ngOnInit() {
    this.patientId = this.routeParam.params['id'];
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
    if (clinicalIndicator.value !== null && clinicalIndicator.value !== undefined) {
      (this.fusionFormGroup.controls['clinicalIndicator'])
      .setValue(clinicalIndicator.value);
    }
  }
  OnQueryTypeChanged(queryType) {
    if (queryType.value !== null && queryType.value !== undefined) {
      (this.fusionFormGroup.controls['queryType'])
      .setValue(queryType.value);
    }
  }

  OnPhysicianNameChanged(physicianName){
    if (physicianName.value !== null && physicianName.value !== undefined) {
      (this.fusionFormGroup.controls['physicianName'])
      .setValue(physicianName.value);
    }
  }
  OnQueryDiagnosisChanged(queryDiagnosis) {
    if (queryDiagnosis.value !== null && queryDiagnosis.value !== undefined) {
      (this.fusionFormGroup.controls['queryDiagnosis'])
      .setValue(queryDiagnosis.value);
    }
  }
  OnStatusChanged(status){
    if (status.value !== null && status.value !== undefined) {
      (this.fusionFormGroup.controls['status'])
      .setValue(status.value);
    }
  }
  OnResponseTypeChanged(responseType) {
    if (responseType.value !== null && responseType.value !== undefined) {
      (this.fusionFormGroup.controls['responseType'])
      .setValue(responseType.value);
    }
  }

  primaryAction() {
    if (this.fusionFormGroup.invalid) {
      this._drawerService.setPrimaryActionState(true, false);
      return;
    }

    if (this.fusionFormGroup.value.queryDate !== null && this.fusionFormGroup.value.queryDate !== '') {
      this.fusionFormGroup.value.queryDate = this._datepipe.transform(this.fusionFormGroup.value.queryDate, 'yyyy-MM-dd');
    }
    if (this.fusionFormGroup.value.responseDate !== null && this.fusionFormGroup.value.responseDate !== '') {
      this.fusionFormGroup.value.responseDate = this._datepipe.transform(this.fusionFormGroup.value.responseDate, 'yyyy-MM-dd');
    }
    this.patientFindingInfo = {...this.fusionFormGroup.value};
    this.patientFindingInfo.facilityId = localStorage.getItem('TenantId');
    this.patientFindingInfo.patientId = this.patientId;
    this._drawerService.setPrimaryActionState(false, true);
    if(this.data) {
      this.patientFindingInfo.id = this.data.id;
      this.editExistingPatientFinding();
    } else {
      this.addNewPatientFinding();
    }

  }
  addNewPatientFinding() {
    this.patientFindingService.addPatientFinding(this.patientId, this.patientFindingInfo)
      .subscribe((response) => {
        if (response) {
          this._snackBarService.openCustomSnackBar(
            { message: 'Patient Finding Added Successfully.', icon: 'fa-check s-18' },
            3000,
            'snackbar-success'
          );
          this._drawerService.closeDrawer();
        }
      });
  }
  editExistingPatientFinding() {
    this.patientFindingService
      .updatePatientFinding(this.patientId ,this.patientFindingInfo)
      .subscribe((response) => {
        if (response) {
          this._snackBarService.openCustomSnackBar(
            { message: 'Patient Finding Updated Successfully.', icon: 'fa-check s-18' },
            3000,
            'snackbar-success'
          );
          this._drawerService.closeDrawer();
        }
      });
  }
  secondaryAction() {}
  panelClose() {}
}
