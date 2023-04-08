import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FusionFormComponent } from "@zhealthcare/fusion/components";

@Component({
    selector: 'zhealthcare-ck-editor-drawer-example',
    templateUrl: './ck-editor-drawer-example.component.html'
})
export class CkEditorDrawerExampleComponent extends FusionFormComponent {

    //#region [CK Edtitor Variables]

    public ckEditorConfigData: any;
    public Editor = ClassicEditor;

    //#endregion

    ngOnInit() {
        this.setEditorConfiguration();
    }

    constructor(private readonly _fb: FormBuilder) {
        super();
        this.fusionFormGroup = this._fb.group({
            dataControl_: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
        })
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
                    'redo'
                ]
            },
            language: 'en',
            licenseKey: ''
        };
    }
    //====================END ==========================================//

}
