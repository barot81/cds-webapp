import { Injectable } from "@angular/core";
import { ComponentMap } from "@exxat/fusion/core";
import { AddReleaseNotesDrawerComponent } from "./drawers/add-release-notes-drawer/add-release-notes-drawer.component";

@Injectable({providedIn: 'any'})
export class ReleaseNotesDemoAppDrawerService extends ComponentMap {
    /**
     *
     */
    constructor() {
        super();
        this.add('ryzen-add-release-notes-drawer', AddReleaseNotesDrawerComponent);
    }
}
