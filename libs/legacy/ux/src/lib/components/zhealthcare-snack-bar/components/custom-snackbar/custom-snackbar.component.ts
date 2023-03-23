import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
})
export class CustomSnackbarComponent implements OnInit {
  constructor(
    public sbRef: MatSnackBarRef<CustomSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit() {}

  onClose() {
    this.sbRef.dismiss();
  }
}
