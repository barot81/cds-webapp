import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { HeaderService } from "@zhealthcare/ux";

@Component({
    selector: 'zhealthcare-graphs-layouts-container',
    templateUrl: 'layouts-container.component.html',
})
export class LayoutsContainerComponent implements AfterViewInit {

    @ViewChild('graphs_layouts_header') elementView: ElementRef;

    constructor(public _headerService: HeaderService) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let height = this.elementView.nativeElement.offsetHeight;
            this._headerService.setCurrentHeaderHeight(height);
        });
    }

}