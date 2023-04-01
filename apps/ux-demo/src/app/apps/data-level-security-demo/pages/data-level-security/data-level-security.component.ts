import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FullScreenService, HeaderService } from "@exxat/ux";
import { DataLevelSecurityDrawerService } from "../../drawers";


export interface DataSecurityGridElement {
    user: string;
    role: string;
    dataPolicy: Array<string>;
    value: Array<string>;
}

const ELEMENT_DATA: DataSecurityGridElement[] = [
    { user: 'User 1', role: 'Role 1', dataPolicy: ['Cohort', 'Course', 'Rotation'], value: ['Cohort 2020, Cohort 2021', 'PT 501 - Clinical Exprience 1, PA 601 Family Medicine', 'Rotation 1, Rotation 2, Rotation 3'] },
    { user: 'User 2', role: 'Role 2', dataPolicy: ['Cohort', 'Course', 'Rotation'], value: ['Cohort 2020, Cohort 2021', 'PT 501 - Clinical Exprience 1, PA 601 Family Medicine', 'Rotation 1, Rotation 2, Rotation 3'] },
    { user: 'User 3', role: 'Role 3', dataPolicy: ['Cohort', 'Course', 'Rotation'], value: ['Cohort 2020, Cohort 2021', 'PT 501 - Clinical Exprience 1, PA 601 Family Medicine', 'Rotation 1, Rotation 2, Rotation 3'] },
    { user: 'User 4', role: 'Role 4', dataPolicy: ['Cohort', 'Course', 'Rotation'], value: ['Cohort 2020, Cohort 2021', 'PT 501 - Clinical Exprience 1, PA 601 Family Medicine', 'Rotation 1, Rotation 2, Rotation 3'] },
    { user: 'User 5', role: 'Role 5', dataPolicy: ['Cohort', 'Course', 'Rotation'], value: ['Cohort 2020, Cohort 2021', 'PT 501 - Clinical Exprience 1, PA 601 Family Medicine', 'Rotation 1, Rotation 2, Rotation 3'] },
    { user: 'User 6', role: 'Role 6', dataPolicy: ['Cohort', 'Course', 'Rotation'], value: ['Cohort 2020, Cohort 2021', 'PT 501 - Clinical Exprience 1, PA 601 Family Medicine', 'Rotation 1, Rotation 2, Rotation 3'] },
    { user: 'User 7', role: 'Role 7', dataPolicy: ['Cohort', 'Course', 'Rotation'], value: ['Cohort 2020, Cohort 2021', 'PT 501 - Clinical Exprience 1, PA 601 Family Medicine', 'Rotation 1, Rotation 2, Rotation 3'] },
    { user: 'User 8', role: 'Role 8', dataPolicy: ['Cohort', 'Course', 'Rotation'], value: ['Cohort 2020, Cohort 2021', 'PT 501 - Clinical Exprience 1, PA 601 Family Medicine', 'Rotation 1, Rotation 2, Rotation 3'] },
    { user: 'User 9', role: 'Role 9', dataPolicy: ['Cohort', 'Course', 'Rotation'], value: ['Cohort 2020, Cohort 2021', 'PT 501 - Clinical Exprience 1, PA 601 Family Medicine', 'Rotation 1, Rotation 2, Rotation 3'] },
    { user: 'User 10', role: 'Role 10', dataPolicy: ['Cohort', 'Course', 'Rotation'], value: ['Cohort 2020, Cohort 2021', 'PT 501 - Clinical Exprience 1, PA 601 Family Medicine', 'Rotation 1, Rotation 2, Rotation 3'] }
]

@Component({
    selector: 'ryzen-data-level-security',
    templateUrl: './data-level-security.component.html'
})

export class DataLevelSecurityComponent implements AfterViewInit {

    @ViewChild('header') elementView: ElementRef;

    displayedColumns: string[] = ['user', 'role', 'dataPolicy', 'value', 'actions'];
    dataSource = new MatTableDataSource<DataSecurityGridElement>(ELEMENT_DATA);
    full_scroll_table_header_height: number;
    fullScreenMode: boolean = false;
    fixedSettledHeight: number = 135;
    /**
     *
     */
    constructor(public headerService: HeaderService, public _drawerService: DataLevelSecurityDrawerService, public _fullScreenService: FullScreenService) {

    }

    ngAfterViewInit() {
        this.setGridHeight();
    }

    setGridHeight(): void {
        setTimeout(() => {
            this.full_scroll_table_header_height = this.elementView.nativeElement.offsetHeight + this.fixedSettledHeight;
        });
    }


    toggleFullScreenMode() {

        this.fullScreenMode = !this.fullScreenMode;
        var el = document.documentElement;
        if (this.fullScreenMode) {
            setTimeout(() => {
                el.requestFullscreen();
                this.headerService.setCurrentHeaderHeight(this.fixedSettledHeight);
            });
        }
        else {
            document.exitFullscreen();
            this.setGridHeight();
        }
        this._fullScreenService.setFullScreenModeEnabled(this.fullScreenMode);

    }
}