import { Component, OnInit } from '@angular/core';
import { RegistrationSandbox } from '../../registration.sandbox';
import { BaseComponent } from '@exxat/fusion/core';
import { Terms } from '../../models/terms.model';

@Component({
  selector: 'registration-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent extends BaseComponent
  implements OnInit {
  termsAndConditions: any;
  terms: any;
  constructor(private registrationSandbox: RegistrationSandbox) {
    super();
    this.terms = new Terms();
  }

  ngOnInit() {
    this.registrationSandbox.terms().subscribe(response => {
      this.termsAndConditions = response.termsAndConditions;
    });
  }
}
