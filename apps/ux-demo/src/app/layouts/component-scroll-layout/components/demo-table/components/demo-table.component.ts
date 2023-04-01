import { SelectionModel } from "@angular/cdk/collections";
import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";


export interface PeriodicElement {
    src: string,
    email: string;
    firstName: string;
    lastName: string;
    phone: number;
    setting: string;
    time: string;
    action: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
    { src: "assets/images/avatars/anna-strong.png", firstName: 'Anna', lastName: 'Strong', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/alice.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/Barrera.jpg", firstName: 'Winkfield', lastName: 'Strong', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/Blair.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/anna-strong.png", firstName: 'Anna', lastName: 'Strong', email: 'Nipetribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/Boyle.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/Boyle.jpg", firstName: 'PWelson', lastName: 'Strong', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/Christy.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/Boyle.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/Boyle.jpg", firstName: 'Anna', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/anna-strong.png", firstName: 'Anna', lastName: 'Strong', email: 'Nipetribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/Boyle.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/Boyle.jpg", firstName: 'PWelson', lastName: 'Strong', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
    { src: "assets/images/avatars/Christy.jpg", firstName: 'Barragan', lastName: 'Laurrel', email: 'petribc.welson@example.com', phone: 9987654321, setting: 'ENT Oncology Surgery', time: '09:39 hrs', action: '' },
];


@Component({
    selector: 'exxat-demo-table',
    templateUrl: 'demo-table.component.html'
})
export class DemoTableComponent {

    displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'setting', 'time', 'action'];

    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);


    constructor() { }

    ngOnInit() {
    }

    /** Whether the number of selected elements matches the total number of rows. */
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
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.firstName + 1}`;
    }

}