import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { HeaderService } from "@exxat/ux";

interface DocumentDate {
    dateType: string;
    date: string;
}

interface DocumentItem {
    title: string;
    dates: Array<DocumentDate>;
}

interface PeriodicElement {
    requirement: string;
    expiration_date: string;
    documentations: Array<DocumentItem>;
}

const ELEMENT_DATA: Array<PeriodicElement> = [
    {
        requirement: 'Measles,mumps,rubella (MMR)',
        expiration_date: 'May 30, 2021',
        documentations: [
            { title: 'Vaccination', dates: [{ dateType: 'Dose 1 Date', date: '6/16/2021' }] },
            { title: 'Titer', dates: [{ dateType: 'Result Date', date: '6/23/2021' }, { dateType: 'Expiration Date', date: '6/23/2021' }] },
            { title: 'Titer', dates: [{ dateType: 'Result Date', date: '6/16/2021' }] }
        ]
    },
    {
        requirement: 'Varicella (Chickenpox)',
        expiration_date: 'N/A',
        documentations: [
            { title: 'Vaccination', dates: [{ dateType: 'Dose 1 Date', date: '6/23/2021' }, { dateType: 'Dose 2 Date', date: '6/23/2021' }] }
        ]
    },
    {
        requirement: 'Polio',
        expiration_date: '6/9/2021',
        documentations: [
            { title: 'Vaccination', dates: [{ dateType: 'Dose 1 Date', date: '6/23/2021' }] }
        ]
    },
    {
        requirement: 'Tetanus, diphtheria and pertussis ( TDAP )',
        expiration_date: '6/9/2021',
        documentations: [
            { title: 'Vaccination', dates: [{ dateType: 'Dose 1 Date', date: '6/16/2021' }] },
            { title: 'Titer', dates: [{ dateType: 'Result Date', date: '6/23/2021' }, { dateType: 'Expiration Date', date: '6/23/2021' }] }
        ]
    },
    {
        requirement: 'Insurance',
        expiration_date: '6/9/2021',
        documentations: [
            { title: 'Vaccination', dates: [{ dateType: 'Dose 1 Date', date: '6/23/2021' }] }
        ]
    },
];

@Component({
    selector: 'ryzen-compliance-summary-grid',
    templateUrl: './compliance-summary-grid.component.html'
})
export class ComplianceSummaryGridComponent implements AfterViewInit {

    @ViewChild('compliance_summary_grid_header') compliance_summary_grid_header: ElementRef;

    settlement_height: number = 32;

    displayedColumns: string[] = ['requirements', 'expiration_date', 'type_of_documentation'];

    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    /**
     *
     */
    constructor(public readonly _headerService: HeaderService) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.compliance_summary_grid_header && this.compliance_summary_grid_header !== null) {
                this._headerService.setCurrentHeaderHeight(this.compliance_summary_grid_header.nativeElement.offsetHeight);
            }
        });
    }
}