import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FusionFormAdapter, FusionFormComponent } from '@zhealthcare/fusion/components';
import { DrawerService, SnackbarService } from '@zhealthcare/ux';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'add-patient-form',
  templateUrl: 'add-patient.component.html'
})

export class AddPatientComponent extends FusionFormComponent implements OnInit, FusionFormAdapter, AfterViewInit {


  maxDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  reimbursementTypeList: Set<string>;
  queryStatusList: Set<string>;
  newPatientInfo: Patient;

  constructor(private patientService: PatientService,
    private readonly fb: FormBuilder,
    private _drawerService: DrawerService,
    private _snackBarService: SnackbarService,
    private _datepipe: DatePipe) {
    super();
    this.fusionFormGroup = this.fb.group({
      name: new FormControl(''),
      room: new FormControl(''),
      admitDate: new FormControl(''),
      healthPlan: new FormControl(''),
      cds: new FormControl(''),
      queryStatus: new FormControl(''),
      queryDate: new FormControl(''),
      facility: new FormControl(''),
      comments: new FormControl(''),
      reimbursementType: new FormControl(''),
    });


  }
  ngAfterViewInit(): void {
    if(this.data) {
      this.fusionFormGroup.patchValue(this.data);
    }
  }

  ngOnInit() {
//    this._drawerService.setPrimaryActionState(false, true);

    this.reimbursementTypeList = new Set(this.patientService.getPatients().map(x=>x.reimbursementType));
    this.queryStatusList = new Set(this.patientService.getPatients().map(x=>x.queryStatus));
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

  OnReimbursementTypeChange(reimbursementType: any) {
    if (reimbursementType.value !== null && reimbursementType.value !== undefined) {
      (this.fusionFormGroup.controls['reimbursementType'])
      .setValue(reimbursementType.value);
    }
  }

  OnQuerryStatusChanged(queryStatus: any) {
    if (queryStatus.value !== null && queryStatus.value !== undefined) {
      (this.fusionFormGroup.controls['queryStatus'])
      .setValue(queryStatus.value);
    }

  }

  primaryAction() {
    if (this.fusionFormGroup.invalid) return;

    if (this.fusionFormGroup.value.admitDate !== null && this.fusionFormGroup.value.admitDate !== '') {
      this.fusionFormGroup.value.admitDate = this._datepipe.transform(this.fusionFormGroup.value.admitDate, 'yyyy-MM-dd');
    }
    if (this.fusionFormGroup.value.queryDate !== null && this.fusionFormGroup.value.queryDate !== '') {
      this.fusionFormGroup.value.queryDate = this._datepipe.transform(this.fusionFormGroup.value.queryDate, 'yyyy-MM-dd');
    }
    Object.assign(this.newPatientInfo, this.fusionFormGroup.value);
    Object.assign(this.newPatientInfo.facility, localStorage.getItem('TenantId'));

    this._drawerService.setPrimaryActionState(false, true);
    if(this.data) {
      this.editExistingPatient();
    } else {
      this.addNewPatient();
    }

  }
  private addNewPatient() {
    this.patientService
      .addPatient(this.newPatientInfo)
      .subscribe((response) => {
        if (response) {
          this._snackBarService.openCustomSnackBar(
            { message: 'Patient Added Successfully.', icon: 'fa-check s-18' },
            3000,
            'snackbar-success'
          );
          this._drawerService.closeDrawer();
        }
      });
  }
  private editExistingPatient() {
    this.patientService
      .updatePatient(this.newPatientInfo)
      .subscribe((response) => {
        if (response) {
          this._snackBarService.openCustomSnackBar(
            { message: 'Patient Updated Successfully.', icon: 'fa-check s-18' },
            3000,
            'snackbar-success'
          );
          this._drawerService.closeDrawer();
        }
      });
  }

  secondaryAction() {
    throw new Error('Method not implemented.');
  }

  panelClose() {

   }
};

