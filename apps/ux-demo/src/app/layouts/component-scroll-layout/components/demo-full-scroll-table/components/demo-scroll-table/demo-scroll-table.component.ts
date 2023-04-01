import { Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeaderService } from '@exxat/ux';
import { FullScreenService, FuseSidebarService, GoToColumnComponent } from '@exxat/ux';
import { UXDemoDrawerService } from '../../../../../../remote-entry/ux-demo-drawer.service';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface PeriodicScrollTableElement {
    src: string;
    student: string;
}

const ELEMENT_DATA: PeriodicScrollTableElement[] = [
    { src: "assets/images/avatars/anna-strong.png", student: 'Ahmed, Morgan' },
    { src: "assets/images/avatars/alice.jpg", student: 'Ahmed, Hannah' },
    { src: "assets/images/avatars/Barrera.jpg", student: 'Barnes, Issac - WD' },
    { src: "assets/images/avatars/Blair.jpg", student: 'Barnes, Kimberly' },
    { src: "assets/images/avatars/Boyle.jpg", student: 'Br, Stanley' },
    { src: "assets/images/avatars/Christy.jpg", student: 'Brown, Jerica' },
    { src: "assets/images/avatars/anna-strong.png", student: 'Brown, Kelsy' },
    { src: "assets/images/avatars/Barrera.jpg", student: 'Campbell, Priscilla' },
    { src: "assets/images/avatars/Boyle.jpg", student: 'Cao, Kelsi' },
    { src: "assets/images/avatars/Christy.jpg", student: 'Conant, Julie' },
    { src: "assets/images/avatars/anna-strong.png", student: 'Ahmed, Morgan' },
    { src: "assets/images/avatars/alice.jpg", student: 'Ahmed, Hannah' },
    { src: "assets/images/avatars/Barrera.jpg", student: 'Barnes, Issac - WD' },
    { src: "assets/images/avatars/Blair.jpg", student: 'Barnes, Kimberly' },
    { src: "assets/images/avatars/Boyle.jpg", student: 'Br, Stanley' },
    { src: "assets/images/avatars/Christy.jpg", student: 'Brown, Jerica' },
    { src: "assets/images/avatars/anna-strong.png", student: 'Brown, Kelsy' },
    { src: "assets/images/avatars/Barrera.jpg", student: 'Campbell, Priscilla' },
    { src: "assets/images/avatars/Boyle.jpg", student: 'Cao, Kelsi' },
    { src: "assets/images/avatars/Christy.jpg", student: 'Conant, Julie' },
    { src: "assets/images/avatars/anna-strong.png", student: 'Ahmed, Morgan' },
    { src: "assets/images/avatars/alice.jpg", student: 'Ahmed, Hannah' },
    { src: "assets/images/avatars/Barrera.jpg", student: 'Barnes, Issac - WD' },
    { src: "assets/images/avatars/Blair.jpg", student: 'Barnes, Kimberly' },
    { src: "assets/images/avatars/Boyle.jpg", student: 'Br, Stanley' },
    { src: "assets/images/avatars/Christy.jpg", student: 'Brown, Jerica' },
    { src: "assets/images/avatars/anna-strong.png", student: 'Brown, Kelsy' },
    { src: "assets/images/avatars/Barrera.jpg", student: 'Campbell, Priscilla' },
    { src: "assets/images/avatars/Boyle.jpg", student: 'Cao, Kelsi' },
    { src: "assets/images/avatars/Christy.jpg", student: 'Conant, Julie' },
    { src: "assets/images/avatars/anna-strong.png", student: 'Ahmed, Morgan' },
    { src: "assets/images/avatars/alice.jpg", student: 'Ahmed, Hannah' },
    { src: "assets/images/avatars/Barrera.jpg", student: 'Barnes, Issac - WD' },
    { src: "assets/images/avatars/Blair.jpg", student: 'Barnes, Kimberly' },
    { src: "assets/images/avatars/Boyle.jpg", student: 'Br, Stanley' },
    { src: "assets/images/avatars/Christy.jpg", student: 'Brown, Jerica' },
    { src: "assets/images/avatars/anna-strong.png", student: 'Brown, Kelsy' },
    { src: "assets/images/avatars/Barrera.jpg", student: 'Campbell, Priscilla' },
    { src: "assets/images/avatars/Boyle.jpg", student: 'Cao, Kelsi' },
    { src: "assets/images/avatars/Christy.jpg", student: 'Conant, Julie' }
];


@Component({
    selector: 'exxat-demo-scroll-table',
    templateUrl: 'demo-scroll-table.component.html',
})
export class DemoScrollTableComponent extends GoToColumnComponent implements OnChanges {

    @ViewChild('header') elementView: ElementRef;
    @ViewChild('auto_scroll_grid') auto_scroll_grid: ElementRef;

    @Input('parentHeaderHeight') parentHeaderHeight: number;
    full_scroll_table_header_height: number;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.parentHeaderHeight) {
            this.parentHeaderHeight = changes.parentHeaderHeight.currentValue;
        }
    }

    fixedSettledHeight: number = 135;
    fullScreenMode: boolean = false;

    selectedColumn: string;

    statuses = [
        { value: "Get Started", viewValue: "Get Started" },
        { value: "In Progress", viewValue: "In Progress" },
        { value: "Pending Review", viewValue: "Pending Review" },
        { value: "Approved", viewValue: "Approved" },
        { value: "Disapproved", viewValue: "Disapproved" },
        { value: "Expiring", viewValue: "Expiring" },
        { value: "Expired", viewValue: "Expired" }
    ];

    displayedColumns: string[] = [];
    dataSource = ELEMENT_DATA;

    tables = [0];

    columnControl = new FormControl();

    filteredOptions: Observable<string[]>;

    cohortList = [
        'Cohort 2021',
        'Cohort 2022',
        'Cohort 2023',
        'Cohort 2024',
        'Cohort 2025',
    ];


    navigations = [
        {
            id: 'tab-one',
            title: 'Tab One',
            type: 'item',
            url: '/admin/ux/ui/component-scroll-layout/left-side-bar/layout-one/tab-five'
        },
        {
            id: 'tab-two',
            title: 'Tab Two',
            type: 'item',
            url: '/admin/ux/ui/component-scroll-layout/left-side-bar/layout-one/tab-two'
        }
    ]

    constructor(
        public headerService: HeaderService,
        public _uXDemoDrawerService: UXDemoDrawerService,
        public renderer: Renderer2,
        public _fullScreenService: FullScreenService,
        private readonly _FuseSidebarService: FuseSidebarService,
    ) {
        super(renderer);
        this.displayedColumns.length = 19;
        this.displayedColumns.fill('is', 1, 2);
        this.displayedColumns.fill('mmr', 2, 3);
        this.displayedColumns.fill('flu', 3, 4);
        this.displayedColumns.fill('tb', 4, 5);
        this.displayedColumns.fill('hepb', 5, 6);
        this.displayedColumns.fill('varicella', 6, 7);
        this.displayedColumns.fill('tdap', 7, 8);
        this.displayedColumns.fill('hi tab', 8, 9);
        this.displayedColumns.fill('cpr', 9, 10);
        this.displayedColumns.fill('pals', 10, 11);
        this.displayedColumns.fill('licensure', 11, 12);
        this.displayedColumns.fill('hipaa', 12, 13);
        this.displayedColumns.fill('sis log', 13, 14);
        this.displayedColumns.fill('corf', 14, 15);
        this.displayedColumns.fill('ds', 15, 16);
        this.displayedColumns.fill('bgc', 16, 17);
        this.displayedColumns.fill('fp', 17, 18);
        this.displayedColumns.fill('fp bgc', 18, 19);

        // The first two columns should be student and name; the last two columns: weight, symbol
        this.displayedColumns[0] = 'student';

    }

    ngOnInit() {
        this.filteredOptions = this.columnControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );

        this.columnControl.valueChanges.subscribe(data => {
            if (data && data.length > 0) {
                this.selectedColumn = data;
                if (this.displayedColumns.includes(this.selectedColumn)) {
                    if (!this.fullScreenMode) {
                        const sideNav: any = this._FuseSidebarService.getSidebar('carded-left-sidebar-tabbed-2');
                        this.scrollToColumn(this.selectedColumn, (sideNav._elementRef.nativeElement.clientWidth + 40));
                    }
                    else {
                        this.scrollToColumn(this.selectedColumn, 40);
                    }
                }
            }
        })

        //#region  [Full Screen Event Access]

        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement) {
                this.headerService.setCurrentHeaderHeight(this.fixedSettledHeight);
                this.fullScreenMode = true;
                this._fullScreenService.setFullScreenModeEnabled(true);
            } else {
                this.fullScreenMode = false;
                this.setGridHeight();
                this._fullScreenService.setFullScreenModeEnabled(false);
            }
        }
        );

        //#endregion
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.displayedColumns.filter(option => option.toLowerCase().includes(filterValue));
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
