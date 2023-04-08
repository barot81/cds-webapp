import { Component, OnInit } from '@angular/core';
import { DrawerAdapter } from '@zhealthcare/ux';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FusionFormComponent, FusionFormAdapter } from '@zhealthcare/fusion/components';

interface Prop {
  title: string;
  value: string;
}
@Component({
  selector: 'zhealthcare-drawer-disable-form',
  templateUrl: './zhealthcare-drawer-disable-form.component.html',
})
export class zhealthcareDrawerDisableFormComponent
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
      mode: [
        { value: 'Audio Call', disabled: true },
        Validators.compose([Validators.required]),
      ],
      initiatedBy: [
        { value: 'Kyle Dixon', disabled: true },
        Validators.compose([Validators.required]),
      ],
      contactWith: [
        { value: '', disabled: true },
        Validators.compose([Validators.required]),
      ],
      rotationField: [{ value: 'Rotation 1', disabled: true }],
      subject: [
        { value: 'Lorem ipsum dolor sit amet', disabled: true },
        Validators.compose([Validators.required]),
      ],
      message: [
        {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          disabled: true,
        },
        Validators.compose([Validators.required]),
      ],
      dateOfIntervention: [
        { value: 'Nov 20, 2021', disabled: true },
        Validators.compose([Validators.required]),
      ],
      status: [
        { value: 'Rotation 1', disabled: true },
        Validators.compose([Validators.required]),
      ],
      plannedFollowUpDate: [
        { value: 'Dec 20, 2021', disabled: true },
        Validators.compose([Validators.required]),
      ],
      actualFollowUpDate: [
        { value: 'Nov 30, 2021', disabled: true },
        Validators.compose([Validators.required]),
      ],
      FollowUpMessage: [
        {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          disabled: true,
        },
        Validators.compose([Validators.required]),
      ],
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
