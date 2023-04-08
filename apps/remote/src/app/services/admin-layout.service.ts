import { Injectable } from "@angular/core";
import { HeaderService } from "@zhealthcare/ux";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'any'})
export class ProfileAdminLayoutService {

    constructor(private readonly _headerService: HeaderService) {
    }

    //#region [VARIABLES]

    private readonly adminProfileHeaderOneHeight = new BehaviorSubject<number>(0);
    public adminProfileHeaderOneHeight$ = this.adminProfileHeaderOneHeight.asObservable();

    private readonly adminProfileHeaderTwoHeight = new BehaviorSubject<number>(0);
    public adminProfileHeaderTwoHeight$ = this.adminProfileHeaderTwoHeight.asObservable();

    private readonly adminReportHeaderHeight = new BehaviorSubject<number>(0);
    public adminReportHeaderHeight$ = this.adminReportHeaderHeight.asObservable();

    private readonly adminReportGridHeight = new BehaviorSubject<number>(0);
    public adminReportGridHeight$ = this.adminReportGridHeight.asObservable();

    //#endregion

    //#region [PUBLIC METHODS]

    public setAdminProfileHeaderOneHeight(height: number) {
        this.adminProfileHeaderOneHeight.next(height);
    }

    public getAdminProfileHeaderOneHeight(): number {
        return this.adminProfileHeaderOneHeight.value;
    }

    public setAdminProfileHeaderTwoHeight(height: number) {
        this.adminProfileHeaderTwoHeight.next(height);
    }

    public getAdminProfileHeaderTwoHeight(): number {
        return this.adminProfileHeaderTwoHeight.value;
    }

    public setAdminReportHeaderHeight(height: number) {
        this.adminReportHeaderHeight.next(height);
    }

    public getAdminReportHeaderHeight(): number {
        return this.adminReportHeaderHeight.value;
    }

    public setAdminReportContentHeight(headerHeight: number) {
        this.setAdminReportHeaderHeight(headerHeight);
        const headerOneHeight = this.getAdminProfileHeaderOneHeight();
        this._headerService.setCurrentHeaderHeight(headerOneHeight);
        const totalHeight = headerHeight + headerOneHeight;
        this.adminReportGridHeight.next(this._headerService.scrollContentheight - totalHeight);
    }

}
