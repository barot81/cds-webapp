import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { ScrollSpyService } from './scroll-spy.service';

export interface ContentItem {
    item: Element,
    offset: number
}

@Directive({
    selector: '[scrollSpyContent]',
    exportAs: 'scrollSpyContent'
})
export class ScrollSpyContentDirective implements AfterViewInit, OnDestroy {

    //#region  [DIRECTIVE VARIABLES]

    private offsetTop: number = 0;
    private scrollSpyContentItem: Element;
    private elementSelector: string = 'id';
    private scrollSpyContentItemClass = 'scroll_spy_content_item';
    private topMainHeaderId = 'top_main_header';
    private scrollSpyContentItems: Array<ContentItem> = new Array<ContentItem>();
    private topMainHeaderHeight: number = 0;
    private offSetSettleNumber: number = 24;

    //#endregion

    //#region  [Set Directive Variables From Inputs]

    @Input('offsetTop')
    set setOffsetTop(value: number) {
        if (value && value != null) {
            this.offsetTop = value;
        }
    }

    //#endregion

    //#region  [Angular Core Methods]

    constructor(private _el: ElementRef, private _scrollSpyService: ScrollSpyService,
        private _renderer: Renderer2) {
        this.scrollSpyContentItem = this._el.nativeElement;
        this.topMainHeaderHeight = document.getElementById(this.topMainHeaderId).getBoundingClientRect().height;
    }

    ngAfterViewInit(): void {

        this.setScrollSpyContentItems();

        // set active item based on change in service
        this._scrollSpyService.$selectedScrollSpyListItem.subscribe(data => {

            this._scrollSpyService.setLoading(true);

            if (data && data.length > 0) {

                this.scrollSpyContentItem.scroll(0, 0);

                this.setScrollSpyContentItems();

                if (this.scrollSpyContentItems && this.scrollSpyContentItems.length > 0) {
                    let currentElement: ContentItem = this.scrollSpyContentItems.find(x => x.item.getAttribute(this.elementSelector) === data);

                    if (currentElement) {
                        this._renderer.setStyle(this.scrollSpyContentItem, 'scroll-behavior', 'smooth');
                        this.scrollSpyContentItem.scroll(0, (currentElement.offset - this.offsetTop));
                        this._renderer.removeStyle(this.scrollSpyContentItem, 'scroll-behavior');
                    }
                }
            }

            this._scrollSpyService.setLoading(false);
        })

        // on change detection set scroll spy content items
        this._scrollSpyService.$changeDetection.subscribe(result => {
            if (result) {
                this.setScrollSpyContentItems();
            }
        })
    }

    ngOnDestroy(): void {
        this.scrollSpyContentItems = new Array<ContentItem>();
    }

    //#endregion

    //#region  [Private Methods]

    //method to set ScrollSpyListofItems
    private setScrollSpyContentItems() {
        this.scrollSpyContentItems = new Array<ContentItem>();
        this._el.nativeElement.querySelectorAll('.' + this.scrollSpyContentItemClass).forEach((element: Element) => {
            const item = {
                item: element,
                offset: (element.getBoundingClientRect().top - (this.topMainHeaderHeight + this.offSetSettleNumber))
                // offset: (element.getBoundingClientRect().top)
            }
            this.scrollSpyContentItems.push(item);
        });
    }

    //#endregion

}