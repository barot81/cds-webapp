import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { FuseSidebarService, HeaderService, ScrollService } from '@exxat/ux';
import { filter } from 'rxjs/operators';
import { SidebarFocusHelper } from '../../../../exxat-sidebar/exxat-sidebar.service';
import { LayoutPopupSixComponent } from '../../common/popups/layout-popup-six/layout-popup-six.component';

@Component({
    selector   : 'two-sidebar-layout',
    templateUrl: './two-sidebar-layout.component.html',
  styleUrls: ['./two-sidebar-layout.component.scss'],
})
export class TwoSidebarLayoutComponent
{
    selectedId: number = 1;

    students = [
        {id:0, student:'Anna Strong', lastName: 'Strong'},
        {id:1, student:'Mindy Strong', lastName: 'Strong'},
        {id:2, student:'Jeremy Strong', lastName: 'Strong'},
        {id:3, student:'Dan Strong', lastName: 'Strong'},
        {id:4, student:'Jim Strong', lastName: 'Strong'},
        {id:5, student:'Michael Strong', lastName: 'Strong'},
        {id:6, student:'Pam Strong', lastName: 'Strong'},
        {id:7, student:'Kevin Strong', lastName: 'Strong'},
        {id:8, student:'Dwight Strong', lastName: 'Strong'},
        {id:9, student:'Angela Strong', lastName: 'Strong'},
        {id:10, student:'Andy Strong', lastName: 'Strong'} 
      ]
   
    constructor(public dialog: MatDialog,public _focus : SidebarFocusHelper, public _headerService: HeaderService,  public _fuseSidebarService: FuseSidebarService)
    {
      
    }
   
    openDialog() {
        const dialogRef = this.dialog.open(LayoutPopupSixComponent);
      }

      toggleSidebar(name): void
      {
          this._fuseSidebarService.getSidebar(name).toggleOpen();
      }

      activateNavigation(item: number) {
        this.selectedId = item;
        this._focus.shiftFocus();
      }
}
