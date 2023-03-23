import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'fusion-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
})
export class FusionCustomSnackbarComponent implements OnInit {
  constructor(
    public sbRef: MatSnackBarRef<FusionCustomSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit() { }

  onClose() {
    this.sbRef.dismiss();
  }
}
