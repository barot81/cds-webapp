import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FullScreenService, HeaderService } from "@zhealthcare/ux";

@Component({
    selector: 'zhealthcare-layout-one-container',
    templateUrl: 'layout-one-container.component.html'
})
export class LayoutOneContainerComponent implements AfterViewInit, OnInit {



    @ViewChild('left_side_bar_layout_one_header') elementView: ElementRef;

    headerHeight: number;

    constructor(private readonly headerService: HeaderService, public _fullScreenService: FullScreenService) {
    }

    ngOnInit(): void {
        //#region  [Full Screen Event Access]

        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement) {
                this.setHeaderHeight();
            }
        }
        );

        //#endregion
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let height = this.elementView.nativeElement.offsetHeight;
            this.headerHeight = height;
            this.setHeaderHeight();
        });
    }

    private setHeaderHeight() {
        setTimeout(() => {
            this.headerService.setCurrentHeaderHeight(this.headerHeight);
        });
    }

}