import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface exxat_grid_guideline_item {
    title: string;
    icon: string;
    description?: Array<string>;
    page?: string;
}



@Component({
    selector: 'exxat-grid-guidelines',
    templateUrl: './exxat-grid-guidelines-container.component.html',
    styleUrls: ['./exxat-grid-guidelines-container.component.scss']
})
export class ExxatGrdiGuidelinesContainerComponent {
    searchByItem: FormControl;

    listofOptions = [
        { fieldName: "title", displayName: "Title" },
        { fieldName: "description", displayName: "Description" },
    ];

    searchItem = new FormControl();

    exxat_grid_guideline_list: exxat_grid_guideline_item[] = [
        {
            icon: 'fab fa-blackberry',
            title: 'Simple Grid',
            description: ['This example has Simple GRID with static pagination from material , also with placeholder for Search, Full screen, Primary and secondary actions'],
            page: '/admin/ux/ui/exxat-grids'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Expandable Row Grid',
            description: ['Expandable Row Grid Example'],
            page: '/admin/ux/ui/expandable-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Expandable Cell Grid',
            description: ['Expandable Cell Grid Example'],
            page: '/admin/ux/ui/expandable-cell-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Sticky Column Grid',
            description: ['This example has Simple GRID with an provision of first column as sticky h , also with placeholder for Search, Full screen'],
            page: '/admin/ux/ui/sticky-column-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Grid With Tabs',
            description: ['This grid example contains tabs above GRID with placeholders for primary and secondary actions'],
            page: '/admin/ux/ui/grid-with-tabs'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Condensed Grid',
            description: ['This example has GRID with reduced vertical height for rows in order to accommodate more data on screen, with placeholders for primary and secondary actions'],
            page: '/admin/ux/ui/condensed-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Secondary Grid',
            description: ['Secondary Grid Example'],
            page: '/admin/ux/ui/secondary-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Flex Scrollable Grid',
            description: ['Flex Scrollable Grid Example'],
            page: '/admin/ux/ui/scrollable-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Header Hover Grid',
            description: ['This example has Simple GRID with hover action. On hovering in the table heading, an dummy icon will appear , also with placeholder for Search, Full screen, Primary and secondary actions'],
            page: '/admin/ux/ui/header-hover-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Go to Column Grid',
            description: ['Go to Column Grid Example'],
            page: '/admin/ux/ui/auto-scroll-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Multi Row Grid',
            description: ['This grid example contains multiple rows inside a single column , along with a placeholder for SEARCH and FULL screen'],
            page: '/admin/ux/ui/multi-row-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Col Span Grid',
            description: ['This example of GRID has provision of more than one headers. The header in one column is further divided in multiple sub columns , also with placeholder for Search, Full screen'],
            page: '/admin/ux/ui/table-with-colspan'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Multiple Header Grid',
            description: ['This example of GRID has provision of more than one headers , also with placeholder for Search, Full screen with primary and secondary actions'],
            page: '/admin/ux/ui/grid-with-two-header-rows'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Notification History Grid',
            description: ['Notification History Grid Example'],
            page: '/admin/ux/ui/notification-history-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Expand Collapse Grid',
            description: ['This example has GRID show more/less functionally written from custom code (based on read more / read less), also with placeholder for Search'],
            page: '/admin/ux/ui/onclick-arrow-expand-collapse-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Summary Grid',
            description: ['Summary Grid Example'],
            page: '/admin/ux/apps/compliance-summary-grid'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Component Level Scroll Grid -- With Side Bar',
            description: ['Component Level Scroll Grid -- With Side Bar -- New Grid Guidelines'],
            page: '/admin/ux/ui/new-grid-guidelines/component-level-scroll-with-left-sidebar'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Page Level Scroll Grid -- With Side Bar',
            description: ['Page Level Scroll Grid -- With Side Bar -- New Grid Guidelines'],
            page: '/admin/ux/ui/new-grid-guidelines/full-page-level-scroll-with-left-sidebar'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Component Level Scroll Grid -- Without Side Bar',
            description: ['Component Level Scroll Grid -- Without Side Bar -- New Grid Guidelines'],
            page: '/admin/ux/ui/new-grid-guidelines/component-level-scroll-without-left-sidebar'
        },
        {
            icon: 'fab fa-blackberry',
            title: 'Page Level Scroll Grid -- Without Side Bar',
            description: ['Page Level Scroll Grid -- Without Side Bar -- New Grid Guidelines'],
            page: '/admin/ux/ui/new-grid-guidelines/full-page-level-scroll-without-left-sidebar'
        },
    ];

    filtered_exxat_grid_guideline_list = new BehaviorSubject<exxat_grid_guideline_item[]>(new Array<exxat_grid_guideline_item>());
    filtered_exxat_grid_guideline_list$ = this.filtered_exxat_grid_guideline_list.asObservable();

    constructor() {

        this.searchByItem = new FormControl(this.listofOptions[0].fieldName);

        this.exxat_grid_guideline_list = this.exxat_grid_guideline_list.sort((a, b) => (a.title > b.title) ? 1 : -1);

        this.filtered_exxat_grid_guideline_list.next(this.exxat_grid_guideline_list);

        this.searchItem.valueChanges.subscribe(changes => {
            if (changes && changes !== null && changes.length > 0) {

                if (this._filter(changes, 'title').length > 0 && this._filter(changes, 'description').length > 0) {

                    let data = this._filter(changes, 'title').concat(this._filter(changes, 'description'));

                    var unique = data.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    })

                    this.filtered_exxat_grid_guideline_list.next(unique);
                }

                else if (this._filter(changes, 'title').length > 0) {

                    this.filtered_exxat_grid_guideline_list.next(this._filter(changes, 'title'));
                }
                else {
                    this.filtered_exxat_grid_guideline_list.next(this._filter(changes, 'description'));
                }
            }
            else {
                this.filtered_exxat_grid_guideline_list.next(this.exxat_grid_guideline_list);
            }
        });

    }

    private _filter(value: string, searchItem: string): exxat_grid_guideline_item[] {

        const filterValue = value.toLowerCase();

        return this.exxat_grid_guideline_list.filter(item => item[searchItem].toString().toLowerCase().indexOf(filterValue) > -1);
    }
}