import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { OrgFacade } from '@zhealthcare/fusion/core';
import { OuCodeAccessTree } from '@zhealthcare/fusion/models';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    public windowHeight: BehaviorSubject<number>;
    public currentHeaderHeight: BehaviorSubject<number>;
    public showReleaseNotes: BehaviorSubject<boolean>;
    public scrollContentheight: number;
    public tenantName: BehaviorSubject<string>;
    public selectedOUCodeCaption$: BehaviorSubject<string>;
    orgFacade: OrgFacade;
    defaultAddedHeight = 82;
    /**
     *
     */
    constructor(orgFacade: OrgFacade) {
        this.currentHeaderHeight = new BehaviorSubject<number>(100);
        this.windowHeight = new BehaviorSubject<number>(window.innerHeight);
        this.showReleaseNotes = new BehaviorSubject<boolean>(false);
        let initialTenantName = "";
        this.orgFacade = orgFacade;
        if(localStorage.getItem('tenantFullName') != null){
            initialTenantName = localStorage.getItem('tenantFullName');
            orgFacade.SetTenantName(initialTenantName);
        }
        this.tenantName = new BehaviorSubject<string>(initialTenantName);
        this.selectedOUCodeCaption$ = new BehaviorSubject<string>(localStorage.getItem('selectedOUCodeCaption') ?? '');
        if(localStorage.getItem('tenantWithOucodeTreeWithCaption')!=null) {
            const tenantWithOucodeTreeWithCaption = JSON.parse(localStorage.getItem('tenantWithOucodeTreeWithCaption'));
            this.orgFacade.SetOuCodeAccessTree(tenantWithOucodeTreeWithCaption.Children);
          }
    }

    getCurrentHeaderHeight() {
        return this.currentHeaderHeight.value;
    }

    setCurrentTenantName(tenantName: string) {
        localStorage.setItem('tenantFullName', tenantName);
        this.orgFacade.SetTenantName(tenantName);
        this.tenantName.next(tenantName);
    }

    setSelectedOUCodeCaption(selectedOUCodeCaption: string) {
        localStorage.setItem('selectedOUCodeCaption', selectedOUCodeCaption);
        this.selectedOUCodeCaption$.next(selectedOUCodeCaption ?? '')
    }

    setTenantWithOucodeTreeWithCaption(tenantWithOucodeTreeWithCaption: OuCodeAccessTree) {
        localStorage.setItem('tenantWithOucodeTreeWithCaption', JSON.stringify(tenantWithOucodeTreeWithCaption));
        this.orgFacade.SetOuCodeAccessTree(tenantWithOucodeTreeWithCaption.Children);
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
