import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HeaderService } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-patientlog-demo',
  templateUrl: './patientlog-demo.component.html',
})
export class PatientlogDemoComponent implements OnInit {

  @ViewChild('patient_log_Header') elementView: ElementRef;
  
  constructor(private headerService: HeaderService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      let height = this.elementView.nativeElement.offsetHeight;
      this.headerService.setCurrentHeaderHeight(height);
    })
  }

}
