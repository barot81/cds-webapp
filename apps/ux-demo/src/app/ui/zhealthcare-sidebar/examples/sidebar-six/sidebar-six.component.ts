import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { FuseSidebarService, ScrollService } from '@zhealthcare/ux';
import { filter } from 'rxjs/operators';
import { SidebarFocusHelper } from '../../zhealthcare-sidebar.service';
import { SidebarLayoutPopupSixComponent } from '../popups/layout-popup-six/layout-popup-six.component';

@Component({
  selector: 'ryzen-sidebar-six',
  templateUrl: './sidebar-six.component.html',
})
export class SidebarSixComponent implements OnInit {

  @ViewChild('sidebarHeader') sidebarHeader: ElementRef;
  private currentURL =
  'admin/ux/ui/zhealthcare-sidebar/sidebar-six';
  selectedId = 1;
  items = [
    {id:0},
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5},
    {id:6},
    {id:7},
    {id:8},
    {id:9},
    {id:10} 
  ]
  constructor(
    public _fuseSidebarService: FuseSidebarService,
    public dialog: MatDialog,
    public _focus : SidebarFocusHelper,
    public readonly _scrollService: ScrollService,
    private _router: Router
  )  {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event$) => {
        if (this.currentURL === event$['url']) {
          await this.setSidebarHeaderHeight();
        }
      });
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

  // toogle sidebar in small screens
  toggleSidebar(name): void {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  openDialog() {
    const dialogRef = this.dialog.open(SidebarLayoutPopupSixComponent);
  }

  ngOnInit() {
  }

  activateNavigation(item:number) {
    this.selectedId = item;
    this._focus.shiftFocus();
  }

}
