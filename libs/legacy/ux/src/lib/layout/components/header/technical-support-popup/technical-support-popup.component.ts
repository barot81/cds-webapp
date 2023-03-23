import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'exxat-technical-support-popup',
  templateUrl: './technical-support-popup.component.html',
  styleUrls: ['./technical-support-popup.component.scss']
})
export class TechnicalSupportPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<TechnicalSupportPopupComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
