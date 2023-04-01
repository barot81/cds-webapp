import { Component } from '@angular/core';
import { FuseSidebarService } from '@zhealthcare/ux';

@Component({
  selector: 'layout-header',
  templateUrl: './layout-header.component.html'
})
export class LayoutHeaderComponent {
  constructor(public _fuseSidebarService: FuseSidebarService) {}

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
