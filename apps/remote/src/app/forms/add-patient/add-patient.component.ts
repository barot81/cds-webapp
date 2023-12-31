import { DatePipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FusionFormAdapter, FusionFormComponent } from '@zhealthcare/fusion/components';
import { DrawerService, SnackbarService } from '@zhealthcare/ux';
import { Patient } from '../../models/patient.model';
import { richTextConfig } from '../../configs/richtext.config';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'add-patient-form',
  templateUrl: 'add-patient.component.html'
})

export class AddPatientComponent extends FusionFormComponent implements FusionFormAdapter, AfterViewInit {


  maxDate =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  patientInfo: Patient = new Patient();
  queryStatusList: string[];
  reimbursementTypeList: string[];
  comments: any;

  public componentEvents: string[] = [];
  public Editor = ClassicEditor;
  config: any;

  constructor(public patientService: PatientService,
    private readonly fb: FormBuilder,
    private _drawerService: DrawerService,
    private _snackBarService: SnackbarService,
    private _datepipe: DatePipe) {
    super();
    this.fusionFormGroup = this.fb.group({
      lastName: new FormControl('kaptel'),
      firstName: new FormControl('ankit'),
      accountNo: new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(6)
      ]),
      roomId: new FormControl('R001'),
      admissionDate: new FormControl(''),
      dischargeDate: new FormControl(''),
      healthPlanName: new FormControl(''),
      cds: new FormControl('ashit'),
      queryStatus: new FormControl('Reviewed'),
      queryDate: new FormControl(''),
      reimbursementType: new FormControl('Medicaid'),
      concurrent_postDC: new FormControl(''),
      secondaryInsurance: new FormControl(''),
      pdx: new FormControl(''),
      mrn: new FormControl(''),
      comments: new FormControl('')
    });

    this.queryStatusList = ['No findings', 'Reviewed', 'Revised', 'Review Later'];
    this.reimbursementTypeList = ['Medicare', 'Medicaid', 'Commercial'];
  }
  ngAfterViewInit(): void {
    if(this.data) {
      this.fusionFormGroup.patchValue(this.data);
      this.comments = this.data?.comments;
    }
  }

  public editorValue(event) {
    this.comments = event.editor.getData();
    this.comments = this.comments?.replace(/\\(?=[^\[\]]*\])|\\(?=\[)/g, ''); // (\\) this is to remove \ appended by ckeditor before brackets []
    //this.summary = this.summary?.replace(/<\/?span[^>]*>/g,"")
    this.fusionFormGroup.controls['comments'].setValue(this.comments);
  }

  createConfig() {
    this.config = richTextConfig;
    this.config.placeholder = 'Comments';
  }

  public onReady(event) {
    this.componentEvents.push('The editor is ready.');
  }

  public onChange(event) {
    this.componentEvents.push('Editor model changed.');
    this.editorValue(event);
  }

  public onFocus(event) {
    this.componentEvents.push('Focused the editing view.');
  }

  public onBlur(event) {
    this.componentEvents.push('Blurred the editing view.');
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
    if (this.fusionFormGroup.invalid) {
      this._drawerService.setPrimaryActionState(true, false);
      return;
    }

    if (this.fusionFormGroup.value.admissionDate !== null && this.fusionFormGroup.value.admissionDate !== '') {
      this.fusionFormGroup.value.admissionDate = this._datepipe.transform(this.fusionFormGroup.value.admissionDate, 'yyyy-MM-dd');
    }
    if (this.fusionFormGroup.value.dischargeDate !== null && this.fusionFormGroup.value.dischargeDate !== '') {
      this.fusionFormGroup.value.dischargeDate = this._datepipe.transform(this.fusionFormGroup.value.dischargeDate, 'yyyy-MM-dd');
    }
    if (this.fusionFormGroup.value.queryDate !== null && this.fusionFormGroup.value.queryDate !== '') {
      this.fusionFormGroup.value.queryDate = this._datepipe.transform(this.fusionFormGroup.value.queryDate, 'yyyy-MM-dd');
    }
    this.patientInfo = {...this.fusionFormGroup.value};
    this.patientInfo.facilityId = localStorage.getItem('TenantId');

    this._drawerService.setPrimaryActionState(false, true);
    if(this.data) {
      this.patientInfo.id = this.data.id;
      this.editExistingPatient();
    } else {
      this.addNewPatient();
    }

  }
  private addNewPatient() {
    this.patientService
      .addPatient(this.patientInfo)
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
      .updatePatient(this.patientInfo)
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

  panelClose() { }
};

