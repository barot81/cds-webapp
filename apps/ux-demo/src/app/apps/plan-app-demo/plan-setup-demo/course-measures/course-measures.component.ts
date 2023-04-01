import { Component, OnInit, ViewChild, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { PlanAppDemoDrawerService } from '../../plan-app-demo-drawer.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { isPlatformBrowser } from '@angular/common';
import { HeaderService } from '@exxat/ux';

@Component({
  selector: 'ryzen-course-measures',
  templateUrl: './course-measures.component.html',
})
export class CourseMeasuresComponent implements OnInit, AfterViewInit {

  @ViewChild('course_measure_title') $course_measure_title: any;

  contentList: Array<string> = [
    "Course Objectives",
    "Course Outcomes",
    "Course Goals",
    "Instructional Objectives",
    "Event Objectives",
    "Student Learning Outcomes",
  ]
  constructor(public _PlanAppDemoDrawerService: PlanAppDemoDrawerService,
    private router: Router,
    public _headerService: HeaderService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this._headerService.setCurrentHeaderHeight(0);
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.$course_measure_title._elementRef.nativeElement.focus();
          }, 0);
        }
      });
  }

}
