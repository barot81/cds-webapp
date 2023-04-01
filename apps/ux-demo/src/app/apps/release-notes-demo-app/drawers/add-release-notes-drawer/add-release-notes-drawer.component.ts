import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as ClassicEditor from '@zhealthcare/ckeditor5-build-classic'

@Component({
  selector: 'ryzen-add-release-notes-drawer',
  templateUrl: './add-release-notes-drawer.component.html'
})
export class AddReleaseNotesDrawerComponent implements OnInit {

  releaseNotesForm: FormGroup;
  ckEditorConfigData: any;
  public Editor = ClassicEditor;
  constructor(private _fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.releaseNotesForm = this._fb.group({
      sprint: ['R8'],
      versionTitle: [],
      section1: ['Overall Summary'],
      section2: ['Compliance'],
      section3: ['Site'],
      section4: ['Placements'],
    })
  }

  ngOnInit() {
    this.setEditorConfiguration();
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
          'outdent',
          'indent',
          '|',
          'blockQuote',
          '|',
          'undo',
          'redo'
        ]
      },
      language: 'en',
      licenseKey: '',
    };
  }
  //====================END ==========================================//
}
