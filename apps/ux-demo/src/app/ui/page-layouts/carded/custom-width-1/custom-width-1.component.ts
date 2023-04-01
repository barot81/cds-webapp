import { Component } from '@angular/core';
import { CustomWidthComponent } from './custom-width/custom-width.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector   : 'carded-fullwidth-1',
    templateUrl: './custom-width-1.component.html',
})
export class CardedCustomWidth1Component
{
    /**
     * Constructor
     */
    constructor(public dialog: MatDialog) {}

    openDialog() {
      const dialogRef = this.dialog.open(CustomWidthComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  
