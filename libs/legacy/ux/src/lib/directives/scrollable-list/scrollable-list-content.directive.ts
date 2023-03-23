import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { ScrollableListService } from './scrollable-list.service';

interface ScrollableListContentItem {
  item: Element;
  offset: number;
}

@Directive({
  selector: '[scrollableListContent]',
  exportAs: 'scrollableListContent'
})
export class ScrollableListContentDirective
  implements OnInit, AfterViewInit, OnDestroy
{
  navMenuContent: Element;

  private contentItems: Array<ScrollableListContentItem> =
    new Array<ScrollableListContentItem>();

  constructor(
    private elementRef: ElementRef,
    private scrollableListService: ScrollableListService,
    private renderer: Renderer2
  ) {
    this.navMenuContent = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.scrollableListService.$selectedMenuItem.subscribe((data) => {
      this.getContentItems();

      if (this.contentItems && this.contentItems.length === 0) {
        this.getContentItems();
      }

      if (data && data.length > 0) {
        this.contentItems.forEach((x) => {
          if (x.item.getAttribute('step_id') === data) {
            this.renderer.setStyle(
              this.navMenuContent,
              'scroll-behavior',
              'smooth'
            );
            this.navMenuContent.scroll(0, x.offset - 64);

            this.renderer.removeStyle(this.navMenuContent, 'scroll-behavior');
          }
        });
      }
    });

    this.scrollableListService.$viewChangeDetector.subscribe((data) => {
      if (data) {
        this.getContentItems();
      }
    });
  }

  ngAfterViewInit(): void {
    this.getContentItems();
  }

  private getContentItems() {
    this.contentItems = new Array<ScrollableListContentItem>();

    let parentItems = this.elementRef.nativeElement.querySelectorAll(
      '.scrollable_list_content_item'
    );

    if (parentItems && parentItems !== null && parentItems.length > 0) {
      parentItems.forEach((element) => {
        const item = {
          item: element,
          offset: element.offsetTop
        };
        this.contentItems.push(item);

        let childItems = element.querySelectorAll(
          '.scrollable_list_content_child_item'
        );

        if (childItems && childItems !== null && childItems.length > 0) {
          childItems.forEach((child) => {
            const childItem = {
              item: child,
              offset: element.offsetTop + child.offsetTop
            };
            this.contentItems.push(childItem);
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.contentItems = new Array<ScrollableListContentItem>();
  }
}
