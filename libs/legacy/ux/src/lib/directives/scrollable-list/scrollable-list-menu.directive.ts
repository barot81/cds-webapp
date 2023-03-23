import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[scrollableListMenu]',
  exportAs: 'scrollableListMenu'
})
export class ScrollbleListMenuDirective
  implements AfterViewInit, OnDestroy
{
  private listItems: Array<Element> = new Array<Element>();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.initListItems();
  }

  private initListItems() {
    this.listItems = new Array<Element>();

    setTimeout(() => {
      this.elementRef.nativeElement
        .querySelectorAll('.scrollable_list_menu_item')
        .forEach((element) => {
          this.listItems.push(element);
        });
    });
  }

  ngOnDestroy(): void {
    this.listItems = new Array<any>();
  }
}
