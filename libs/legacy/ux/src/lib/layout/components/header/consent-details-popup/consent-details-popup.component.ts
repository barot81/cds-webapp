import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserConsentSandbox } from '@exxat/fusion/core';

@Component({
  selector: 'exxat-consent-details-popup',
  templateUrl: './consent-details-popup.component.html',
  styleUrls: ['./consent-details-popup.component.scss']
})
export class ConsentDetailsPopupComponent implements OnInit {
  consentText: string;
  consentedAt: string;

  constructor(private userConsentSandbox: UserConsentSandbox, private dialogRef: MatDialogRef<ConsentDetailsPopupComponent>) {
    this.getConsentDateTime();
  }

  ngOnInit() {
    this.consentText = "Loading..";
    this.userConsentSandbox.getConsentAgreeement().subscribe(data => {
      this.consentText = data.value;
    });
  }
  getConsentDateTime() {
    this.consentedAt = localStorage.getItem("user.consent.consentedAt");
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
