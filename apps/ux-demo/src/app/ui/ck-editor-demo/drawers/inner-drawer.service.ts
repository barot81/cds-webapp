import { Injectable } from "@angular/core";
import { ComponentMap } from "@exxat/fusion/core";
import { CkEditorDrawerExampleComponent } from "./ck-editor-drawer-example/ck-editor-drawer-example.component";

@Injectable({providedIn: 'any'})
export class InnerDrawerService extends ComponentMap {
    /**
     *
     */
    constructor() {
        super();
        this.add('exxat-ck-editor-drawer-example', CkEditorDrawerExampleComponent)
    }
}
