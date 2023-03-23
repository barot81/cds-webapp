import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'zhealthcare-app-snack-bar-with-close',
  templateUrl: './snack-bar-with-close.component.html',
  styleUrls: ['./snack-bar-with-close.component.scss']
})
export class SnackBarWithCloseComponent {

  constructor(public sbRef: MatSnackBarRef<SnackBarWithCloseComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  onClose() {
    this.sbRef.dismiss();
  }
}
