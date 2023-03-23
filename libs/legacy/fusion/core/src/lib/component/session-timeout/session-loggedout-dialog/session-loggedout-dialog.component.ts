import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'session-loggedout-dialog',
  templateUrl: './session-loggedout-dialog.component.html',
})
export class SessionLoggedoutDialogComponent {

  isDelegatorUser = false;
  constructor(public dialogRef: MatDialogRef<SessionLoggedoutDialogComponent>) { 
    if(JSON.parse(sessionStorage.getItem('IsDelegateUser'))) {
      this.isDelegatorUser = true;
    }
  }

  onConfirm() {
    this.dialogRef.close();
  }

}
