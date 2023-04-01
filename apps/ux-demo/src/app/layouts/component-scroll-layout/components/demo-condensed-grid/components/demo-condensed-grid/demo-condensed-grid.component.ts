import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FullScreenService, FuseSidebarService, GoToColumnComponent, HeaderService } from '@zhealthcare/ux';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { UXDemoDrawerService } from '../../../../../../remote-entry/ux-demo-drawer.service';
export interface PeriodicCondensedGridElement {
    src: string;
    student: string;
}

const ELEMENT_DATA: PeriodicCondensedGridElement[] = [
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
    selector: 'zhealthcare-demo-condensed-grid',
    templateUrl: './demo-condensed-grid.component.html',
    styleUrls: ['demo-condensed-grid.component.scss']
})
export class DemoCondensedGridComponent extends GoToColumnComponent {

    @ViewChild('header') elementView: ElementRef;

    displayedColumns: string[] = [];

    dataSource = ELEMENT_DATA;

    full_scroll_table_header_height: number;

    tables = [0];

    columnControl = new FormControl();

    filteredOptions: Observable<string[]>;

    fixedSettledHeight: number = 135;

    fullScreenMode: boolean = false;

    selectedColumn: string;

    constructor(public headerService: HeaderService,
        public _uXDemoDrawerService: UXDemoDrawerService,
        public renderer: Renderer2,
        public _fullScreenService: FullScreenService,
        private readonly _FuseSidebarService: FuseSidebarService,) {
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

    ngAfterViewInit() {
        this.setGridHeight();
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
                        this.scrollToColumn(this.selectedColumn, (sideNav._elementRef.nativeElement.clientWidth + 50));
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




