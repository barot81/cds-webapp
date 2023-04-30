import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FusionFormAdapter, FusionFormComponent } from '@zhealthcare/fusion/components';
import { DrawerService, LayoutService, SnackbarService } from '@zhealthcare/ux';
import { Subject } from 'rxjs';
import { GeneralComments } from '../../models/general-comments.model';
import { richTextConfig } from '../../models/richtext.config';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'patient-add-general-comments',
  templateUrl: 'add-general-comments.component.html',
})
export class AddGeneralCommentsComponent
  extends FusionFormComponent
  implements OnInit, FusionFormAdapter, AfterViewInit, OnDestroy
{

  public componentEvents: string[] = [];
  public Editor = ClassicEditor;
  config: any;
  private readonly _unsubscribeAll: Subject<any>;
  comments: string;
  patientInfo: Patient;
  constructor(
    private readonly fb: FormBuilder,
    public route: ActivatedRoute,
    private readonly _patientService: PatientService,
    private _layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
    private _snackBarService: SnackbarService,
    private _drawerService: DrawerService

  ) {
    super();

    this._unsubscribeAll = new Subject();

    this.fusionFormGroup = this.fb.group({
      comments: []
    });

    this.createConfig();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if(this.data) {
      this.setPatientInfo(this.data);
    } else {
      this.route.params.subscribe((x) => {
        this._patientService.getPatientById(x.id).subscribe((res) => {
          this.setPatientInfo(res);
        });
      });
    }
  }

  private setPatientInfo(patient) {
    this.patientInfo = patient;
    this.fusionFormGroup.patchValue(patient.generalComment);
    this.comments = patient?.generalComment?.comments;
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
          addedOn: new Date().toUTCString(),
      }
       const updatedPatientInfo = {...this.patientInfo, generalComment: {...generalComments} };
      this._patientService.updatePatient(updatedPatientInfo).subscribe(response => {
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
  }

  secondaryAction() {}

  panelClose() {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
