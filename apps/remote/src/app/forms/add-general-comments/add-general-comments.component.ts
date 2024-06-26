import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  FusionFormAdapter,
  FusionFormComponent,
} from '@zhealthcare/fusion/components';
import { DrawerService, LayoutService, SnackbarService } from '@zhealthcare/ux';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GeneralComment,
  PatientComment,
} from '../../models/general-comments.model';
import { richTextConfig } from '../../configs/richtext.config';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { DatePipe } from '@angular/common';
import { UserFacade } from '@zhealthcare/fusion/core';

@Component({
  selector: 'patient-add-general-comments',
  templateUrl: 'add-general-comments.component.html',
  styleUrls: ['./add-general-comments.component.scss'],
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
  followupComments: GeneralComment[] = [];
  loggedInUser$ = new BehaviorSubject(null);
  currentUser: string;
  constructor(
    private readonly fb: FormBuilder,
    public router: Router,
    private readonly _patientService: PatientService,
    private _snackBarService: SnackbarService,
    private _drawerService: DrawerService,
    private _datepipe: DatePipe,
    private _userFacade: UserFacade
  ) {
    super();

    this._unsubscribeAll = new Subject();

    this.fusionFormGroup = this.fb.group({
      comments: new FormControl('', Validators.required),
      reviewStatus: new FormControl('New', Validators.required),
    });

    this.reviewStatusList = ['No Query', 'Later Review'];
    this.createConfig();
    this._userFacade.UserState$.subscribe((data) => {
      if (data) {
        this.loggedInUser$.next(data.user);
        this.currentUser = `${data.user.LastName ? data.user.LastName : ''}${
          data.user.firstName ? ' ' + data.user.FirstName : ''
        }`;
      }
    });
  }

  OnReviewStatusChanged(reviewStatus) {
    if (reviewStatus.value) {
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
      this.getPatientInfo(this.data);
    } else {
      const patientId = this.routeParam.params['id'];
      this._patientService.getPatientById(patientId).subscribe((res) => {
        this.getPatientInfo(res);
      });
    }
  }

  private sortCommnets(followupComments) {
    return followupComments.sort((a, b) => {
      return new Date(a.addedOn).getDate() - new Date(b.addedOn).getDate();
    });
  }

  private getPatientInfo(patient: Patient) {
    this.patientInfo = {
      id: patient.id,
      generalComment: patient.generalComment,
      reviewStatus: patient.reviewStatus,
    };
    if (patient.followupComments && patient.followupComments.length > 0) {
      this.followupComments = this.sortCommnets(patient.followupComments);
    } else {
      this.followupComments = [];
    }
    if (!this.reviewStatusList.includes(patient.reviewStatus)) {
      this.reviewStatusList.unshift(patient.reviewStatus);
    }
    this.fusionFormGroup.controls['reviewStatus'].setValue(
      this.patientInfo.reviewStatus
    );
  }

  createConfig() {
    this.config = richTextConfig;
    this.config.placeholder = 'General Comments';
  }

  primaryAction() {
    if (this.key) {
        this.patientInfo.generalComment = {
          comments: this.fusionFormGroup.controls['comments'].value,
          addedBy: this.currentUser
            ? this.currentUser
            : localStorage.getItem('userName'),
          addedOn: this._datepipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss'),
        };
      if (!this.patientInfo.generalComment?.comments && !this.patientInfo.reviewStatus) {
        this._drawerService.closeDrawer();
        return;
      }
      this.patientInfo.reviewStatus =
        this.fusionFormGroup.controls['reviewStatus'].value;
      this._patientService.updatePatientComments(this.patientInfo).subscribe(
        (response) => {
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
        (error) => {
          this._snackBarService.openCustomSnackBar(
            {
              message: 'General Comment in not updated Successfully.',
              icon: 'fa-check s-18',
            },
            3000,
            'snackbar-error'
          );
          this._drawerService.closeDrawer();
        }
      );
    }
  }

  secondaryAction() {}

  panelClose() {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
