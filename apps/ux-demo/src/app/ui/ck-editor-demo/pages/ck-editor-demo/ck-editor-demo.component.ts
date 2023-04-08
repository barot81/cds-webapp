import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { InnerDrawerService } from '../../drawers';

@Component({
  selector: 'ryzen-ck-editor-demo',
  templateUrl: './ck-editor-demo.component.html',
  styleUrls: ['./ck-editor-demo.component.scss'],
})
export class CkEditorDemoComponent implements OnInit {
  form: FormGroup;

  //#region [CK Edtitor Variables]

  public ckEditorConfigData: any;
  public Editor = ClassicEditor;

  //#endregion

  ngOnInit() {
    this.setEditorConfiguration();
  }

  constructor(
    private readonly _fb: FormBuilder,
    public _drawerService: InnerDrawerService
  ) {
    this.form = this._fb.group({
      dataControl: ['', Validators.compose([Validators.required])],
      dataControl_: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
    });
  }

  public onValidate($event: boolean) {
    // $event will be based on the maxLength validation
  }

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
}
