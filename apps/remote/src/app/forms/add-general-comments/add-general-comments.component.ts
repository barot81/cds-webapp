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
import { GeneralComments } from '../../models/general-comments.model';
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
  patientInfo: Patient;
  queryStatusList: string[];

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
      queryStatus: new FormControl('New'),
    });

    this.queryStatusList = ['New', 'No query', 'Later Review', 'Revised'];
    this.createConfig();
  }

  OnQueryStatusChanged(queryStatus) {
    if (queryStatus.value !== null && queryStatus.value !== undefined) {
      this.fusionFormGroup.controls['queryStatus'].setValue(queryStatus.value);
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

  private setPatientInfo(patient) {
    this.patientInfo = patient;
    this.fusionFormGroup.patchValue(patient.generalComment);
    this.comments = patient?.generalComment?.comments;
    this.fusionFormGroup.controls['queryStatus'].setValue(patient.queryStatus);
    this.cdr.detectChanges();
  }

  createConfig() {
    this.config = richTextConfig;
    this.config.placeholder = 'General Comments';
  }

  public editorValue(event) {
    this.comments = event.editor.getData();
    this.comments = this.comments?.replace(/\\(?=[^\[\]]*\])|\\(?=\[)/g, ''); // (\\) this is to remove \ appended by ckeditor before brackets []
    //this.summary = this.summary?.replace(/<\/?span[^>]*>/g,"")
    this.fusionFormGroup.controls['comments'].setValue(this.comments);
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

  primaryAction() {
    if (this.key) {
      const generalComments: GeneralComments = {
        comments: this.comments,
        addedBy: this._layoutService.getUser()?.name,
        addedOn: this._datepipe.transform(new Date(), 'yyyy-MM-dd'),
      };
      const queryStatus = this.fusionFormGroup.controls['queryStatus'].value;
      const updatedPatientInfo = {
        ...this.patientInfo,
        queryStatus: queryStatus,
        generalComment: { ...generalComments },
      };
      this._patientService
        .updatePatient(updatedPatientInfo)
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
