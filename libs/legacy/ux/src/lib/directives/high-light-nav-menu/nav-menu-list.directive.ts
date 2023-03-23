import { AfterViewInit, Directive, ElementRef, Renderer2, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { HighLightNavMenuService } from './high-light-nav-menu.service';

@Directive({
    selector: '[navMenuList]',
    exportAs: 'navMenuList'
})
export class NavMenuListDirective implements AfterViewInit, OnChanges, OnDestroy {


    @Input('list_of_items') public list_of_items?: any;
    private listItems: Array<Element> = new Array<Element>();

    constructor(private elementRef: ElementRef, private highLightNavMenuService: HighLightNavMenuService,
        private renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.list_of_items.currentValue.length > 0) {
            this.initListItems();
        }
    }

    ngAfterViewInit(): void {

        this.initListItems();

        this.highLightNavMenuService.$selectedNavMenuItem.subscribe(data => {

            if (data && data.length > 0) {

                this.listItems.forEach(x => {

                    if (x.getAttribute('id') === data) {
                        this.renderer.addClass(x, 'active-list-item');
                    }
                    else {
                        this.renderer.removeClass(x, 'active-list-item');
                    }
                })
            }
        })
    }

    ngOnDestroy(): void {
        this.listItems = new Array<any>();
    }

    initListItems() {

        this.listItems = new Array<Element>();

        setTimeout(() => {

            this.elementRef.nativeElement.querySelectorAll('.mat-list-item').forEach(element => {
                this.listItems.push(element);
            });

            if (this.listItems && this.listItems.length > 0) {
                this.highLightNavMenuService.setCurrentNavMenuItem(this.listItems[0].getAttribute('id'));
                this.renderer.addClass(this.listItems[0], 'active-list-item');
            }
        });

    }
}