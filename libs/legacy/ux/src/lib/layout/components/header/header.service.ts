import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { OrgFacade } from '@zhealthcare/fusion/core';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    public windowHeight: BehaviorSubject<number>;
    public currentHeaderHeight: BehaviorSubject<number>;
    public showReleaseNotes: BehaviorSubject<boolean>;
    public scrollContentheight: number;
    public facilityName$: BehaviorSubject<string>;
    public selectedOUCodeCaption$: BehaviorSubject<string>;
    orgFacade: OrgFacade;
    defaultAddedHeight = 82;
    constructor(orgFacade: OrgFacade) {
        this.currentHeaderHeight = new BehaviorSubject<number>(100);
        this.windowHeight = new BehaviorSubject<number>(window.innerHeight);
        this.showReleaseNotes = new BehaviorSubject<boolean>(false);
        let initialFacilityName = "";
        this.orgFacade = orgFacade;
        if(localStorage.getItem('facilityName') != null){
            initialFacilityName = localStorage.getItem('facilityName');
            orgFacade.SetFacilityName(initialFacilityName);
        }
        this.facilityName$ = new BehaviorSubject<string>(initialFacilityName);
    }

    getCurrentHeaderHeight() {
        return this.currentHeaderHeight.value;
    }

    setCurrentFacilityName(facilityName: string) {
        localStorage.setItem('facilityName', facilityName);
        this.orgFacade.SetFacilityName(facilityName);
        this.facilityName$.next(facilityName);
    }


    setWindowHeight(height) {
        this.windowHeight = new BehaviorSubject<number>(height);
        this.scrollContentheight = this.currentHeaderHeight.value + this.defaultAddedHeight;
        this.scrollContentheight = this.windowHeight.value - this.scrollContentheight;
    }
    setCurrentHeaderHeight(height: any) {
        this.currentHeaderHeight = new BehaviorSubject<number>(height);
        this.scrollContentheight = this.currentHeaderHeight.value + this.defaultAddedHeight;
        this.scrollContentheight = this.windowHeight.value - this.scrollContentheight;
    }


}
