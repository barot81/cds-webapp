import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { FuseSidebarService, ScrollService } from '@exxat/ux';
import { filter } from 'rxjs/operators';
import { SidebarLayoutPopupThreeComponent } from '../popups/layout-popup-three/layout-popup-three.component';

@Component({
  selector: 'ryzen-sidebar-three',
  templateUrl: './sidebar-three.component.html',
})
export class SidebarThreeComponent {

    @ViewChild('sidebarHeader') sidebarHeader: ElementRef;
    private currentURL =
    'admin/ux/ui/exxat-sidebar/sidebar-three';

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
  constructor(private _fuseSidebarService: FuseSidebarService, private _router: Router, public dialog: MatDialog, public readonly _scrollService: ScrollService) { 
    this._router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(async (event$) => {
      if (this.currentURL === event$['url']) {
        await this.setSidebarHeaderHeight();
      }
    });
  }

  // toogle sidebar in small screens
  toggleSidebar(name): void {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  toggleSidebarFolded(): void {
      this._fuseSidebarService.getSidebar('carded-left-sidebar-tabbed-2').toggleFold();
      this.isFolded = this._fuseSidebarService.getSidebar('carded-left-sidebar-tabbed-2').folded;
  }

  openDialog() {
    const dialogRef = this.dialog.open(SidebarLayoutPopupThreeComponent);
  }

  private async setSidebarHeaderHeight() {
    setTimeout(async () => {
      if (this.sidebarHeader && this.sidebarHeader !== null) {
        // Reset Main Header Height
        await this._scrollService.resetSidebarHeaderHeight();
        // Set New Height to The Main Header
        await this._scrollService.setSidebarHeaderHeight(
          this.sidebarHeader.nativeElement.offsetHeight
        );
      }
    });
  }


}
