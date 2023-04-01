import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@zhealthcare/ux';

@Component({
    selector: 'zhealthcare-masonry-layout',
    templateUrl: 'masonry-layout.component.html',
    styleUrls: ['masonry-layout.component.scss']
})
export class MasonryLayoutComponent implements OnInit {


    constructor(public readonly _headerService: HeaderService) {

    }

    ngOnInit() {
        this._headerService.setCurrentHeaderHeight(0);
    }

}
