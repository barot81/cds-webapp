import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxWithImageDemoComponent } from '../confirm-dialog-box-demo/dialog-box-with-image-demo/dialog-box-with-image-demo.component';

@Component({
  selector: 'ryzen-exxat-avatar',
  templateUrl: './exxat-avatar.component.html',
  styleUrls: ['./exxat-avatar.component.scss']
})
export class ExxatAvatarComponent implements OnInit {

  constructor( public dialog: MatDialog) {
  }
  ngOnInit() {
  }

  openDialogWithImage() {
    const dialogRef = this.dialog.open(DialogBoxWithImageDemoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
