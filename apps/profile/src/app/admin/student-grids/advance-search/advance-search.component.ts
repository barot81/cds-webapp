import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'student-advance-search',
  templateUrl: './advance-search.component.html',
})
export class AdvanceSearchComponent implements OnInit {
  reportId = '5d45d7a6-fb3d-4108-9753-db9f36176520';
  api_link = 'https://embedwebserviceapi.azurewebsites.net/Loadarlsdetailsadvstudent';
 constructor(
   ) {}

  ngOnInit(): void {
  }
}
