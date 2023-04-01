import { Component } from '@angular/core';
import { FuseSidebarService, ScrollSpyService } from '@exxat/ux';

@Component({
  selector: 'ryzen-page-level-scroll-example',
  templateUrl: './page-level-scroll-example.component.html',
  styleUrls: ['./page-level-scroll-example.component.scss']
})
export class PageLevelScrollExampleComponent {

  constructor(private _fuseSidebarService: FuseSidebarService, private _scrollSpyService: ScrollSpyService) { }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  changeNavMenuItem(id: string) {
    this._scrollSpyService.setSelectedScrollSpyListItem(id);
  }

}
