import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FuseSidebarService, ScrollService } from '@zhealthcare/ux';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'zhealthcare-left-sidebar-component',
    templateUrl: './left-sidebar-layout.component.html',
})
export class LeftSidebarLayoutComponent {

    tooltipOptions = {
      'contentType': 'string',
      'placement': 'right',
      'trigger': 'hover',
      'max-width': '450',
      'width': 'auto',
      'pointerEvents': 'auto'
  }
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isFolded: boolean;
  isOpened: boolean;
  mouseenter() {
      if (!this.isExpanded) {
          this.isShowing = true;
      }
  }

  mouseleave() {
      if (!this.isExpanded) {
          this.isShowing = false;
      }
  }
  constructor(private _fuseSidebarService: FuseSidebarService,public readonly _scrollService: ScrollService) { 
  }

  // toogle sidebar in small screens
  toggleSidebar(name): void {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  toggleSidebarFolded(): void {
      this._fuseSidebarService.getSidebar('carded-left-sidebar-tabbed-2').toggleFold();
      this.isFolded = this._fuseSidebarService.getSidebar('carded-left-sidebar-tabbed-2').folded;
  }

}
