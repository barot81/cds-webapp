import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HeaderService } from '@exxat/ux';

@Component({
  selector: 'ryzen-evaluation-admin-demo',
  templateUrl: './evaluation-admin-demo.component.html',
})
export class EvaluationAdminDemoComponent implements OnInit {

  @ViewChild('evaluation_admin_Header') elementView: ElementRef;

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
