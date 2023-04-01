import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeaderService } from '@exxat/ux';

@Component({
  selector: 'ryzen-placement',
  templateUrl: './placement.component.html',
})
export class PlacementComponent implements OnInit {

  @ViewChild('placement_header') elementView: ElementRef;

  cohortControl = new FormControl();

  cohorts = [
    { value: "Class 2020", viewValue: "Class 2020" },
    { value: "Class 2021", viewValue: "Class 2021" },
    { value: "Class 2022", viewValue: "Class 2022" },
  ];

  constructor(private headerService: HeaderService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      let height = this.elementView.nativeElement.offsetHeight;
      this.headerService.setCurrentHeaderHeight(height);
    })
  }

  ngOnInit() {
  }

}
