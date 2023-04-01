
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from '@zhealthcare/ux';
import { PlanAppDemoDrawerService } from '../plan-app-demo-drawer.service';
import { zhealthcareDrawerFormService } from '../../../ui/zhealthcare-drawers/zhealthcare-drawer-forms-shared.service';
import { BehaviorSubject } from 'rxjs';
import { UXDemoDrawerService } from '../../../remote-entry/ux-demo-drawer.service';
import { GridService } from '../../student-grid/grid.service';

export interface PeriodicElement {
  course_number: string;
  course_name: string;
  acadamic_year: string;
  term: string;
  cohort: string;
  professional_year: string;
  student_number: string;
  faculty: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { course_number: 'PT509', course_name: 'Introduction to Neuroanatomy', acadamic_year: '2018-2019', term: 'Fall', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT509', course_name: 'Cellular and systems physiology', acadamic_year: '2017-2018 ', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 3', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH509', course_name: 'Tests and Measurements', acadamic_year: '2017-2018 ', term: 'Fall', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT503', course_name: 'Biomechanics and Movement Science', acadamic_year: '2018-2019', term: 'Winter', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH6111', course_name: 'Introduction to Neuroanatomy', acadamic_year: '2018-2019', term: 'Fall', cohort: 'Class of 2020', professional_year: 'Year 3', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH6111', course_name: 'Cellular and systems physiology', acadamic_year: '2017-2018 ', term: 'Fall', cohort: 'Class of 2020', professional_year: 'Year 2', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH509', course_name: 'Tests and Measurements', acadamic_year: '2017-2018 ', term: 'Fall', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT503', course_name: 'Biomechanics and Movement Science', acadamic_year: '2018-2019', term: 'Winter', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH6111', course_name: 'Introduction to Neuroanatomy', acadamic_year: '2018-2019', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT509', course_name: 'Cellular and systems physiology', acadamic_year: '2017-2018 ', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH509', course_name: 'Tests and Measurements', acadamic_year: '2017-2018 ', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT503', course_name: 'Biomechanics and Movement Science', acadamic_year: '2018-2019', term: 'winter', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH6111', course_name: 'Introduction to Neuroanatomy', acadamic_year: '2018-2019', term: 'winter', cohort: 'Class of 2020', professional_year: 'Year 3', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT509', course_name: 'Cellular and systems physiology', acadamic_year: '2017-2018 ', term: 'winter', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH509', course_name: 'Tests and Measurements', acadamic_year: '2017-2018 ', term: 'winter', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT503', course_name: 'Biomechanics and Movement Science', acadamic_year: '2018-2019', term: 'Fall', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH6111', course_name: 'Introduction to Neuroanatomy', acadamic_year: '2018-2019', term: 'Winter', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT509', course_name: 'Cellular and systems physiology', acadamic_year: '2017-2018 ', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 3', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH509', course_name: 'Tests and Measurements', acadamic_year: '2017-2018 ', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT503', course_name: 'Biomechanics and Movement Science', acadamic_year: '2018-2019', term: 'Winter', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH6111', course_name: 'Introduction to Neuroanatomy', acadamic_year: '2018-2019', term: 'Fall', cohort: 'Class of 2020', professional_year: 'Year 2', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT509', course_name: 'Cellular and systems physiology', acadamic_year: '2017-2018 ', term: 'Fall', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH509', course_name: 'Tests and Measurements', acadamic_year: '2017-2018 ', term: 'Fall', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT503', course_name: 'Biomechanics and Movement Science', acadamic_year: '2018-2019', term: 'Fall', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH6111', course_name: 'Introduction to Neuroanatomy', acadamic_year: '2018-2019', term: 'Winter', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT509', course_name: 'Cellular and systems physiology', acadamic_year: '2017-2018 ', term: 'Winter', cohort: 'Class of 2020', professional_year: 'Year 2', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH509', course_name: 'Tests and Measurements', acadamic_year: '2017-2018 ', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT503', course_name: 'Biomechanics and Movement Science', acadamic_year: '2018-2019', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH6111', course_name: 'Introduction to Neuroanatomy', acadamic_year: '2018-2019', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT509', course_name: 'Cellular and systems physiology', acadamic_year: '2017-2018 ', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PTH509', course_name: 'Tests and Measurements', acadamic_year: '2017-2018 ', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },
  { course_number: 'PT503', course_name: 'Biomechanics and Movement Science', acadamic_year: '2018-2019', term: 'Spring', cohort: 'Class of 2020', professional_year: 'Year 1', student_number: '56', faculty: 'Arlene McCoy' },

];


@Component({
  selector: 'ryzen-plan-demo-app-container',
  templateUrl: './plan-demo-app-container.component.html',
})
export class PlanDemoAppContainerComponent implements OnInit {

  gray_header_height = new BehaviorSubject<number>(0);
  gray_header_height$ = this.gray_header_height.asObservable();

  search_bar_filter_container = new BehaviorSubject<number>(0);
  search_bar_filter_container$ = this.search_bar_filter_container.asObservable();

  @ViewChild('gray_header') $gray_header: ElementRef;
  @ViewChild('search_bar_filter_container') $search_bar_filter_container: ElementRef;

  navigations = [
    {
      id: 'courses',
      title: 'Courses',
      type: 'item',
      url: '/admin/ux/apps/plan-app-demo'
    },
    // {
    //   id: 'courses_offering',
    //   title: 'Courses offering',
    //   type: 'item',
    //   url: '/admin/ux/apps/plan-app-demo'

    // },
    {
      id: 'courses_catalog',
      title: 'Courses catalog',
      type: 'item',
      url: '/admin/ux/apps/course-catalog-demo'
    },
    // {
    //   id: 'student_registration',
    //   title: 'Student registration',
    //   type: 'item',
    //   url: '/admin/ux/apps/plan-app-demo-3'
    // }
  ]



  displayedColumns: string[] = ['action', 'course_number', 'course_name', 'acadamic_year', 'term', 'cohort', 'professional_year', 'student_number', 'faculty'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  constructor(public headerService: HeaderService, public gridService: GridService,
    public _PlanAppDemoDrawerService: PlanAppDemoDrawerService,
    public _zhealthcareDrawerFormService: zhealthcareDrawerFormService,public _UXDemoDrawerService: UXDemoDrawerService) { }

  ngAfterViewInit() {
    setTimeout(async () => {
      await this.headerService.setCurrentHeaderHeight(0);
      await this.setGrayHeaderHeight();
    });

  }

  private setGrayHeaderHeight():void{
    if(this.$gray_header && this.$gray_header !==null ){
      this.gray_header_height.next(
        this.$gray_header.nativeElement.offsetHeight
      );
    }
  }

  private setSearchbarHeight():void{
    if(this.$search_bar_filter_container && this.$search_bar_filter_container !==null){
      this.gray_header_height.next(
        this.$search_bar_filter_container.nativeElement.offsetHeight
      );
    }
  }

  SearchFields = [
    { value: 'Student Name', id: 1 },
    { value: 'Email', id: 2 },
    { value: 'acadamic_year', id: 3 },
    { value: 'Practice Setting', id: 4 },
    { value: 'Time', id: 5 },
  ];


  ngOnInit() {
  }

}

