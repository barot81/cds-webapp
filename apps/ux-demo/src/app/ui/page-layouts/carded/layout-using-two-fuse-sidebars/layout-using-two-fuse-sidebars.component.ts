import { Component, OnInit } from '@angular/core';
import { Template8DialogBoxComponent } from './layout-popup/layout-popup.component';
import { FuseSidebarService } from '@exxat/ux';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ryzen-layout-using-two-fuse-sidebars',
  templateUrl: './layout-using-two-fuse-sidebars.component.html',
})
export class LayoutUsingTwoFuseSidebarsComponent implements OnInit {

  constructor(private _fuseSidebarService: FuseSidebarService,  public dialog: MatDialog) { }

  ngOnInit() {
  }

  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  
  openDialog() {
      const dialogRef = this.dialog.open(Template8DialogBoxComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

}
