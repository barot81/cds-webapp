import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@zhealthcare/ux';

@Component({
  selector: 'patient-details',
  templateUrl: 'patient-details.component.html'
})

export class PatientDetailsComponent implements OnInit {

  constructor(_headerService:HeaderService ) {
  }

  ngOnInit() { }
}
