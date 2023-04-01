import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HeaderService } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-site-demo',
  templateUrl: './site-demo.component.html',
})
export class SiteDemoComponent implements OnInit {

  @ViewChild('site_header') elementView: ElementRef;

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
