import { Component, AfterViewInit } from '@angular/core';
import { HeaderService, FuseSidebarService } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-resizable-demo',
  templateUrl: './resizable-demo.component.html',
  styleUrls: ['./resizable-demo.component.scss']
})
export class ResizableDemoComponent implements AfterViewInit {

  constructor(public headerService: HeaderService, private _fuseSidebarService: FuseSidebarService) {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.headerService.setCurrentHeaderHeight(50);
    });
  }

  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
