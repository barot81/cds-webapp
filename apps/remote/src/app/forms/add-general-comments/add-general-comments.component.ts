import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  FusionFormAdapter,
  FusionFormComponent,
} from '@zhealthcare/fusion/components';
import { DrawerService, LayoutService, SnackbarService } from '@zhealthcare/ux';
import { Subject } from 'rxjs';
import {
  GeneralComment,
  PatientComment,
} from '../../models/general-comments.model';
import { richTextConfig } from '../../configs/richtext.config';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'patient-add-general-comments',
  templateUrl: 'add-general-comments.component.html',
})
export class AddGeneralCommentsComponent
  extends FusionFormComponent
  implements FusionFormAdapter, AfterViewInit, OnDestroy
{
  public componentEvents: string[] = [];
  public Editor = ClassicEditor;
  config: any;
  private readonly _unsubscribeAll: Subject<any>;
  comments: string;
  patientInfo: PatientComment;
  reviewStatusList: string[];

  constructor(
    private readonly fb: FormBuilder,
    public router: Router,
    private readonly _patientService: PatientService,
    private _layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
    private _snackBarService: SnackbarService,
    private _drawerService: DrawerService,
    private _datepipe: DatePipe
  ) {
    super();

    this._unsubscribeAll = new Subject();

    this.fusionFormGroup = this.fb.group({
      comments: new FormControl(''),
      reviewStatus: new FormControl('New'),
    });

    this.reviewStatusList = ['No Query', 'Later Review'];
    this.createConfig();
  }

  OnReviewStatusChanged(reviewStatus) {
    if (reviewStatus.value !== null && reviewStatus.value !== undefined) {
      this.fusionFormGroup.controls['reviewStatus'].setValue(
        reviewStatus.value
      );
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

  ngAfterViewInit(): void {
    if (this.data) {
      this.setPatientInfo(this.data);
    } else {
      const patientId = this.routeParam.params['id'];
      this._patientService.getPatientById(patientId).subscribe((res) => {
        this.setPatientInfo(res);
      });
    }
  }

  private setPatientInfo(patient:Patient) {
    this.patientInfo = {
      id: patient.id,
      generalComment: patient.generalComment,
      reviewStatus: patient.reviewStatus
    };
    if(!this.reviewStatusList.includes(patient.reviewStatus)) {
      this.reviewStatusList.unshift(patient.reviewStatus);
    }
    this.fusionFormGroup.controls['reviewStatus'].setValue(
      this.patientInfo.reviewStatus
    );
    this.fusionFormGroup.controls['comments'].setValue(
      this.patientInfo.generalComment.comments
    );

  }

  createConfig() {
    this.config = richTextConfig;
    this.config.placeholder = 'General Comments';
  }


  primaryAction() {
    if (this.key) {
      this.patientInfo.generalComment  = {
        comments: this.fusionFormGroup.controls['comments'].value,
        addedBy: this._layoutService.getUser()?.name ?? '',
        addedOn: this._datepipe.transform(new Date(), 'yyyy-MM-dd'),
      };
      this.patientInfo.reviewStatus = this.fusionFormGroup.controls['reviewStatus'].value;
      this._patientService
        .updatePatientComments(this.patientInfo)
        .subscribe((response) => {
          if (response) {
            this._snackBarService.openCustomSnackBar(
              {
                message: 'General Comment Updated Successfully.',
                icon: 'fa-check s-18',
              },
              3000,
              'snackbar-success'
            );
            this._drawerService.closeDrawer();
          }
        },
        (error)=>
        {
          this._snackBarService.openCustomSnackBar(
            {
              message: 'General Comment in not updated Successfully.',
              icon: 'fa-check s-18',
            },
            3000,
            'snackbar-error'
          );
          this._drawerService.closeDrawer();
        });
    }
  }

  secondaryAction() {}

  panelClose() {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
