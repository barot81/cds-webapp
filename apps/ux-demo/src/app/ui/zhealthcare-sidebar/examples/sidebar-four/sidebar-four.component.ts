import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { FuseSidebarService, ScrollService } from '@zhealthcare/ux';
import { filter } from 'rxjs/operators';
import { SidebarFocusHelper } from '../../zhealthcare-sidebar.service';
import { SidebarLayoutPopupFourComponent } from '../popups/layout-popup-four/layout-popup-four.component';

@Component({
  selector: 'ryzen-sidebar-four',
  templateUrl: './sidebar-four.component.html',
})
export class SidebarFourComponent implements OnInit {

  @ViewChild('sidebarHeader') sidebarHeader: ElementRef;
  selectedId: number = 1;
  private currentURL =
  'admin/ux/ui/zhealthcare-sidebar/sidebar-four';

  students = [
    {id:0, firstName:'Anna', lastName: 'Strong'},
    {id:1, firstName:'Mindy', lastName: 'Strong'},
    {id:2, firstName:'Jeremy', lastName: 'Strong'},
    {id:3, firstName:'Dan', lastName: 'Strong'},
    {id:4, firstName:'Jim', lastName: 'Strong'},
    {id:5, firstName:'Michael', lastName: 'Strong'},
    {id:6, firstName:'Pam', lastName: 'Strong'},
    {id:7, firstName:'Kevin', lastName: 'Strong'},
    {id:8, firstName:'Dwight', lastName: 'Strong'},
    {id:9, firstName:'Angela', lastName: 'Strong'},
    {id:10, firstName:'Andy', lastName: 'Strong'} 
  ]

  constructor(private _fuseSidebarService: FuseSidebarService,private _router: Router, public readonly _scrollService: ScrollService, public dialog: MatDialog,  public _focus: SidebarFocusHelper) {
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
    const dialogRef = this.dialog.open(SidebarLayoutPopupFourComponent);
  }

  ngOnInit() {
  }

  activateNavigation(item:number) {
    this.selectedId = item;
    this._focus.shiftFocus();
  }


}
