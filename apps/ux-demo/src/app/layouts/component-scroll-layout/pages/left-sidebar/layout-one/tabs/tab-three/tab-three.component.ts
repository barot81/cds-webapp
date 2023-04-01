import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FuseSidebarService, HeaderService } from '@exxat/ux';

@Component({
    selector: 'exxat-tab-three',
    templateUrl: 'tab-three.component.html',
})
export class TabThreeComponent implements AfterViewInit {

    student_profile_demo_header_height: number;

    @ViewChild('student_profile_demo_header') student_profile_demo_header: ElementRef;

    /**
     *
     */
    constructor(public readonly _headerService: HeaderService, private readonly _FuseSidebarService: FuseSidebarService) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.student_profile_demo_header_height = this.student_profile_demo_header.nativeElement.offsetHeight;
        });
    }

    toggleSidebar(name): void {
        this._FuseSidebarService.getSidebar(name).toggleOpen();
    }
}
