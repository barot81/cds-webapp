import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ComposeComponent } from '../compose/compose.component';
import { FullWidthComponent } from './full-width/full-width.component';

@Component({
    selector   : 'simple-fullwidth-1',
    templateUrl: './full-width-1.component.html',
})
export class SimpleFullWidth1Component
{
    /**
     * Constructor
     */
    constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FullWidthComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
