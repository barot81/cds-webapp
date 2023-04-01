import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxWithImageDemoComponent } from '../confirm-dialog-box-demo/dialog-box-with-image-demo/dialog-box-with-image-demo.component';

@Component({
  selector: 'ryzen-zhealthcare-avatar',
  templateUrl: './zhealthcare-avatar.component.html',
  styleUrls: ['./zhealthcare-avatar.component.scss']
})
export class zhealthcareAvatarComponent implements OnInit {

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
