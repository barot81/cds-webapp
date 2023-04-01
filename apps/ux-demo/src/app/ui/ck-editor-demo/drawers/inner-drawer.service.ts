import { Injectable } from "@angular/core";
import { ComponentMap } from "@zhealthcare/fusion/core";
import { CkEditorDrawerExampleComponent } from "./ck-editor-drawer-example/ck-editor-drawer-example.component";

@Injectable({providedIn: 'any'})
export class InnerDrawerService extends ComponentMap {
    /**
     *
     */
    constructor() {
        super();
        this.add('zhealthcare-ck-editor-drawer-example', CkEditorDrawerExampleComponent)
    }
}
