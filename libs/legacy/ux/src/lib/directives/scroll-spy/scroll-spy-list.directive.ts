import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { ScrollSpyService } from './scroll-spy.service';

@Directive({
    selector: '[scrollSpyList]',
    exportAs: 'scrollSpyList'
})
export class ScrollSpyListDirective implements AfterViewInit, OnDestroy {

    //#region  [DIRECTIVE VARIABLES]

    private scrollSpyListofItems = new Array<Element>();
    private elementSelector: string = 'id';
    private activeItemClass: string = 'scroll_spy_list_active_item';
    private scrollSpyListItemClass = 'scroll_spy_list_item';
    private selectedItemId: string = null;

    //#endregion

    //#region  [Set Directive Variables From Inputs]

    @Input('selectedItemId')
    set setSelectedItemId(value: string) {
        if (value && value != null && value.length > 0) {
            this.selectedItemId = value;
        }
    }

    //#endregion

    //#region  [Angular Core Methods]

    constructor(private _el: ElementRef, private _scrollSpyService: ScrollSpyService,
        private _renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        this.setScrollSpyListofItems();

        // set active item based on change in service
        this._scrollSpyService.$selectedScrollSpyListItem.subscribe(data => {

            this.setScrollSpyListofItems();
            
            if (data && data.length > 0 && this.scrollSpyListofItems && this.scrollSpyListofItems.length > 0) {

                this.scrollSpyListofItems.forEach(x => {

                    if (x.getAttribute(this.elementSelector) === data) {
                        this.setActiveListItem(x);
                    }
                    else {
                        this._renderer.removeClass(x, this.activeItemClass);
                    }
                })
            }
        })

        // on change detection set scroll spy items
        this._scrollSpyService.$changeDetection.subscribe(result => {
            if (result) {
                this.setScrollSpyListofItems();
            }
        })
    }

    ngOnDestroy(): void {
        this.scrollSpyListofItems = new Array<Element>();
        this.setSelectedItemId = null;
    }

    //#endregion

    //#region  [Private Methods]

    //method to set ScrollSpyListofItems
    private setScrollSpyListofItems() {

        this.scrollSpyListofItems = new Array<Element>();

        this.scrollSpyListofItems = this._el.nativeElement.querySelectorAll('.' + this.scrollSpyListItemClass);

        if (this.scrollSpyListofItems && this.scrollSpyListofItems.length > 0) {

            if (this.selectedItemId && this.selectedItemId != null && this.selectedItemId.length > 0) {
                let currentElement = Array.from(this.scrollSpyListofItems).find(x => x.getAttribute(this.elementSelector) === this.selectedItemId);
                this._scrollSpyService.setSelectedScrollSpyListItem(currentElement.getAttribute(this.elementSelector));
                this.setActiveListItem(currentElement);
            }
        }

    }

    //method to set active list item
    private setActiveListItem(item: Element) {
        if (item) {
            this._renderer.removeClass(item, this.activeItemClass);
            this._renderer.addClass(item, this.activeItemClass);
        }
    }
    //#endregion

}