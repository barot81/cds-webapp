import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as ClassicEditor from '@exxat/ckeditor5-build-classic';
import { FusionFormAdapter, FusionFormComponent } from '@exxat/fusion/components';


interface Prop {
  title: string;
  value: string;
}
@Component({
  selector: 'exxat-drawer-reactive-form',
  templateUrl: './exxat-drawer-reactive-form.component.html',
})
export class ExxatDrawerReactiveFormComponent
  extends FusionFormComponent
  implements OnInit, FusionFormAdapter
{
  //#region [CK Edtitor Variables]

  public ckEditorConfigData: any;
  public Editor = ClassicEditor;

  //#endregion

  modes: Array<Prop> = [
    {
      title: 'Audio Call',
      value: 'Audio Call',
    },
    {
      title: 'Video Call',
      value: 'Video Call',
    },
    {
      title: 'Email',
      value: 'Email',
    },
    {
      title: 'In Person',
      value: 'In Person',
    },
    {
      title: 'Other',
      value: 'Other',
    },
  ];

  options: Array<Prop> = [
    {
      title: 'Rotation',
      value: 'Rotation',
    },
    {
      title: 'Rotation 1',
      value: 'Rotation 1',
    },
    {
      title: 'Rotation 2',
      value: 'Rotation 2',
    },
  ];
  constructor(private _fb: FormBuilder) {
    super();
    this.initForm();
  }

  initForm() {
    this.fusionFormGroup = this._fb.group({
      mode: ['', Validators.compose([Validators.required])],
      initiatedBy: ['', Validators.compose([Validators.required])],
      contactWith: ['', Validators.compose([Validators.required])],
      rotationField: [''],
      subject: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
      dateOfIntervention: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      plannedFollowUpDate: ['', Validators.compose([Validators.required])],
      actualFollowUpDate: ['', Validators.compose([Validators.required])],
      FollowUpMessage: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.setEditorConfiguration();
  }
  primaryAction() {}
  secondaryAction() {}
  panelClose() {}

  //================ CK-Editor Initialize Object=======================//
  private setEditorConfiguration() {
    this.ckEditorConfigData = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'link',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'fontColor',
          'fontSize',
          '|',
          'uploadImage',
          '|',
          'outdent',
          'indent',
          '|',
          'blockQuote',
          'undo',
          'redo',
        ],
      },
      language: 'en',
      licenseKey: '',
    };
  }
  //====================END ==========================================//

  public onValidate($event: boolean) {
    // $event will be based on the maxLength validation
  }
}
