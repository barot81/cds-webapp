import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-student-wishlist-demo',
  templateUrl: './student-wishlist-demo.component.html',
})
export class StudentWishlistDemoComponent implements OnInit {
  @ViewChild('student_wishlist_header') elementView: ElementRef;
  constructor(public headerService: HeaderService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
        let height = this.elementView.nativeElement.offsetHeight;
        this.headerService.setCurrentHeaderHeight(height);
    });
  }

}
