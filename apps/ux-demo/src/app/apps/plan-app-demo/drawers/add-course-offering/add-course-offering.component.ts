import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface listItem {
  id: string,
  value: string
}
@Component({
  selector: 'ryzen-add-course-offering',
  templateUrl: './add-course-offering.component.html',
})
export class AddCourseOfferingComponent implements OnInit {

  courseControl = new FormControl();

  selectedCourses: Array<any>;

  cohorts: listItem[] = [
    { id: 'class-2020', value: 'Class 2020' },
    { id: 'class-2021', value: 'Class 2021' },
    { id: 'class-2022', value: 'Class 2022' },
    { id: 'class-2023', value: 'Class 2023' }
  ];

  professionalYears: listItem[] = [
    { id: 'year-2020', value: 'Year 2020' },
    { id: 'year-2021', value: 'Year 2021' },
    { id: 'year-2022', value: 'Year 2022' },
    { id: 'year-2023', value: 'Year 2023' }
  ];

  acadamicYears: listItem[] = [
    { id: 'year-2020', value: 'Year 2020' },
    { id: 'year-2021', value: 'Year 2021' },
    { id: 'year-2022', value: 'Year 2022' },
    { id: 'year-2023', value: 'Year 2023' }
  ];

  terms: listItem[] = [
    { id: 'term-01', value: 'Term 01' },
    { id: 'term-02', value: 'Term 02' },
    { id: 'term-03', value: 'Term 03' },
    { id: 'term-04', value: 'Term 04' }
  ];

  courses: listItem[] = [
    { id: 'PT101', value: 'Tests and Measurements' },
    { id: 'PT102', value: 'Applied Physicology' },
    { id: 'PT103', value: 'Applied Pethology' },
    { id: 'PT104', value: 'Applied Sethology' },
    { id: 'PT105', value: 'Measurements' }
  ]

  constructor() {
    this.selectedCourses = new Array<any>();
    this.selectedCourses.push(this.courses[2]);
  }

  ngOnInit() {
    this.courseControl.valueChanges.subscribe(data => {
      if (data && data.length > 0) {
        const result = this.courses.find(x => x.id === data);
        if (this.selectedCourses.findIndex(x => x.id === result.id) === -1) {
          this.selectedCourses.push(result);
        }
      }
    });
  }

  removeCourse(id: string) {

    const index = this.selectedCourses.findIndex(x => x.id === id);

    this.selectedCourses.splice(index, 1);
  }

}
