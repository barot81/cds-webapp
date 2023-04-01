import { Component } from '@angular/core';
import { HeaderService } from '@exxat/ux';

@Component({
    selector   : 'content-demo-one',
    templateUrl: './content-demo-one.component.html',
})
export class ContentDemoOneComponent
{
    /**
     * Constructor
     */
    constructor(public _headerService : HeaderService)
    {
    }
}
