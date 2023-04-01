import { SelectionModel } from "@angular/cdk/collections";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

export interface AddRuleGridElement {
    studentName: string;
    cohort: string;
    course: string;
    rotation: string;
}

const ELEMENT_DATA: AddRuleGridElement[] = [
    { studentName: 'Last Name, First Name 1', cohort: 'Cohort 2020', course: 'PT 501 - Clinical Exprience 1', rotation: 'Rotation 1' },
    { studentName: 'Last Name, First Name 2', cohort: 'Cohort 2020', course: 'PT 501 - Clinical Exprience 1', rotation: 'Rotation 2' },
    { studentName: 'Last Name, First Name 3', cohort: 'Cohort 2020', course: 'PT 501 - Clinical Exprience 1', rotation: 'Rotation 3' },
    { studentName: 'Last Name, First Name 4', cohort: 'Cohort 2020', course: 'PT 501 - Clinical Exprience 1', rotation: 'Rotation 4' },
    { studentName: 'Last Name, First Name 5', cohort: 'Cohort 2020', course: 'PT 501 - Clinical Exprience 1', rotation: 'Rotation 5' },
    { studentName: 'Last Name, First Name 6', cohort: 'Cohort 2020', course: 'PT 501 - Clinical Exprience 1', rotation: 'Rotation 6' },
];


@Component({
    selector: 'ryzen-add-rule-drawer',
    templateUrl: './add-rule-drawer.component.html'
})

export class AddRuleDrawerComponent {

    displayedColumns: string[] = ['select', 'studentName', 'cohort', 'course', 'rotation'];

    selection = new SelectionModel<AddRuleGridElement>(true, []);

    dataSource = new MatTableDataSource<AddRuleGridElement>(ELEMENT_DATA);

    userListOptions = [
        { value: "user1", viewValue: "User 1" },
        { value: "user2", viewValue: "User 2" },
        { value: "user3", viewValue: "User 3" },
        { value: "user4", viewValue: "User 4" },
        { value: "user5", viewValue: "User 5" },
    ];

    roleListOptions = [
        { value: "role1", viewValue: "Role 1" },
        { value: "role2", viewValue: "Role 2" },
        { value: "role3", viewValue: "Role 3" },
        { value: "role4", viewValue: "Role 4" },
        { value: "role5", viewValue: "Role 5" },
    ];

    dataPolicyOptions = [
        { value: 'Cohort', viewValue: 'Cohort' },
        { value: 'Course', viewValue: 'Course' },
        { value: 'Rotation', viewValue: 'Rotation' },
        { value: 'Student', viewValue: 'Student' },
    ]

    cohortCheckBoxList = [
        { value: 'Cohort 2022', viewValue: 'Cohort 2022' },
        { value: 'Cohort 2021', viewValue: 'Cohort 2021' },
        { value: 'Cohort 2020', viewValue: 'Cohort 2020' },
        { value: 'Cohort 2019', viewValue: 'Cohort 2019' },
        { value: 'Cohort 2018', viewValue: 'Cohort 2018' },
        { value: 'Cohort 2017', viewValue: 'Cohort 20117' },
        { value: 'Cohort 2016', viewValue: 'Cohort 2016' },
        { value: 'Cohort 2015', viewValue: 'Cohort 2015' },
        { value: 'Cohort 2014', viewValue: 'Cohort 2014' },
        { value: 'Cohort 2013', viewValue: 'Cohort 2013' },
    ]

    coursesCheckBoxList = [
        { value: 'Course 1', viewValue: 'PT 501 - Clinical Exprience 1' },
        { value: 'Course 2', viewValue: 'PT 501 - Clinical Exprience 2' },
        { value: 'Course 3', viewValue: 'PT 501 - Clinical Exprience 3' },
        { value: 'Course 4', viewValue: 'PT 501 - Clinical Exprience 4' },
        { value: 'Course 5', viewValue: 'PT 501 - Clinical Exprience 5' },
        { value: 'Course 6', viewValue: 'PT 501 - Clinical Exprience 6' },
    ]

    rotationsCheckBoxList = [
        { value: 'Rotation 1', viewValue: 'Rotation 1' },
        { value: 'Rotation 2', viewValue: 'Rotation 2' },
        { value: 'Rotation 3', viewValue: 'Rotation 3' },
        { value: 'Rotation 4', viewValue: 'Rotation 4' },
        { value: 'Rotation 5', viewValue: 'Rotation 5' },
        { value: 'Rotation 6', viewValue: 'Rotation 6' },
    ]

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: AddRuleGridElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.studentName + 1}`;
    }



}