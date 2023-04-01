import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { HeaderService } from "@zhealthcare/ux";

@Component({
    selector: 'zhealthcare-demo-side-bar',
    templateUrl: 'demo-side-bar.component.html'
})
export class DemoSidebarComponent implements AfterViewInit {

    demo_side_bar_header_height: number;

    @Input('isAvatarVisible') isAvatarVisible: boolean;

    selectedIndex: number = 0;

    @ViewChild('demo_side_bar_header') demo_side_bar_header: ElementRef;

    studentList = [
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
        "Strong Anna",
    ]

    /**
     *
     */
    constructor(public readonly _headerService: HeaderService) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.demo_side_bar_header_height = this.demo_side_bar_header.nativeElement.offsetHeight;
        });
    }

    selectItem(i: number) {
        this.selectedIndex = i;
    }

}