import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CarouselEvent, HeaderService } from "@zhealthcare/ux";

interface HeaderContentItem {
    id: string;
    title: string;
    site: string;
    setting: string;
    rotation: string;
}

interface GridElement {
    date: string;
    status: string;
    preceptor: string;
    start_time: string;
    end_time: string;
    duration: string;
    category: string;
    student_notes: string;
    reviewer_notes: string;
}

const ELEMENT_DATA: Array<GridElement> = [
    {
        date: 'Apr 01,2021',
        status: 'Approved',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: 'Test',
        reviewer_notes: 'Test'
    },
    {
        date: 'Apr 01,2021',
        status: 'In Progress',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: 'Test',
        reviewer_notes: 'Test'
    },
    {
        date: 'Apr 01,2021',
        status: 'Not Approved',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: null,
        reviewer_notes: null
    },
    {
        date: 'Apr 01,2021',
        status: 'Approved',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: 'Test',
        reviewer_notes: 'Test'
    },
    {
        date: 'Apr 01,2021',
        status: 'In Progress',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: null,
        reviewer_notes: null
    },
    {
        date: 'Apr 01,2021',
        status: 'Approved',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: null,
        reviewer_notes: 'Test'
    },
    {
        date: 'Apr 01,2021',
        status: 'Pending Review',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: 'Test',
        reviewer_notes: 'Test'
    },
    {
        date: 'Apr 01,2021',
        status: 'Approved',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: null,
        reviewer_notes: null
    },
    {
        date: 'Apr 01,2021',
        status: 'Pending Review',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: 'Test',
        reviewer_notes: 'Test'
    },
    {
        date: 'Apr 01,2021',
        status: 'Approved',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: 'Test',
        reviewer_notes: null
    },
    {
        date: 'Apr 01,2021',
        status: 'Approved',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: null,
        reviewer_notes: 'Test'
    },
    {
        date: 'Apr 01,2021',
        status: 'Pending Review',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: 'Test',
        reviewer_notes: 'Test'
    },
    {
        date: 'Apr 01,2021',
        status: 'Approved',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: null,
        reviewer_notes: null
    },
    {
        date: 'Apr 01,2021',
        status: 'Pending Review',
        preceptor: 'Thomas, John',
        start_time: '12:00 AM',
        end_time: '12:00 AM',
        duration: '6 Hrs 30 Mins',
        category: 'Non-Clinical',
        student_notes: 'Test',
        reviewer_notes: 'Test'
    },
];

@Component({
    selector: 'zhealthcare-carousel-demo',
    templateUrl: './zhealthcare-carousel-demo-container.component.html'
})
export class zhealthcareCarouselDemoContainerComponent implements AfterViewInit {

    @ViewChild('header_content') header_content: ElementRef;

    @ViewChild('content_header') content_header: ElementRef;

    dataSource = new MatTableDataSource<GridElement>(ELEMENT_DATA);

    displayedColumns: string[] = ['date', 'status', 'preceptor', 'start_time', 'end_time', 'duration', 'category', 'student_notes', 'reviewer_notes'];

    screenWidth = window.innerWidth;

    statuses = ['Get Started', 'Pending', 'Approved', 'In Progress', 'Not Approved'];

    currentHeaderStep: number = 0;

    currentDatesStep: number = 0;

    headerItems: Array<HeaderContentItem> = [
        {
            id: 'id_01',
            title: 'Marshall,Tatum',
            setting: 'Family Medicine',
            site: 'Newyork Rehabilitation Center',
            rotation: 'Rotation 2021-22'
        },
        {
            id: 'id_02',
            title: 'James,Spector',
            setting: 'HMR',
            site: 'Health Rehabilitation Center',
            rotation: 'Rotation 2022-23'
        },
        {
            id: 'id_03',
            title: 'Mickel,Ross',
            setting: 'Health',
            site: 'Newyork Rehabilitation Center',
            rotation: 'Rotation 2021-22'
        },
        {
            id: 'id_04',
            title: 'Marshall,Tatum',
            setting: 'MR',
            site: 'Health Rehabilitation Center',
            rotation: 'Rotation 2021-22'
        }
    ]

    /**
     *
     */
    constructor(public readonly _headerService: HeaderService) {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.header_content && this.header_content !== null && this.content_header && this.content_header !== null) {
                this._headerService.setCurrentHeaderHeight(this.header_content.nativeElement.offsetHeight + this.content_header.nativeElement.offsetHeight + 24);
            }
        });
    }

    getClass(status: string): string {
        return status.replace(/\s/g, "").trim().toLowerCase();
    }

    onHeaderCarouselEvent($event: CarouselEvent) {
        this.currentHeaderStep = $event.currentStep;
    }

    onDatesCarouselEvent($event: CarouselEvent) {
        this.currentDatesStep = $event.currentStep;
    }
}