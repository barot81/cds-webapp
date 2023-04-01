import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@exxat/ux';

@Component({
    selector: 'exxat-masonry-layout',
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
