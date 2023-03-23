import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { HighLightNavMenuService } from './high-light-nav-menu.service';

export interface ContentItem {
  item: Element;
  offset: number;
}

@Directive({
  selector: '[highLightNavMenuContent]',
  exportAs: 'highLightNavMenuContent',
})
export class HighLightNavMenuContentDirective implements OnInit, AfterViewInit {
  @Input() scrollLevel?: 'page' | 'component' | null;

  navMenuContent: Element;

  private contentItems: Array<ContentItem> = new Array<ContentItem>();

  constructor(
    private elementRef: ElementRef,
    private highLightNavMenuService: HighLightNavMenuService,
    private renderer: Renderer2
  ) {
    this.navMenuContent = this.elementRef.nativeElement;
  }

  // @HostListener('scroll', ['$event']) onScrollEvent($event) {

  //     let currentContentItems = this.contentItems.filter(x => x.offset < this.navMenuContent.scrollTop);

  //     // console.log(this.contentItems);

  //     // console.log(currentContentItems);

  //     currentContentItems = currentContentItems.sort((a, b) => b.offset - a.offset);

  //     if (currentContentItems.length > 0) {
  //         // console.log(currentContentItems[0].item.getAttribute('id'));
  //         this.highLightNavMenuService.setcurrentNavMenuContent(currentContentItems[0].item.getAttribute('id'));
  //     }
  // }

  ngOnInit(): void {
    this.highLightNavMenuService.$selectedNavMenuItem.subscribe((data) => {
      this.getContentItems();

      if (this.contentItems && this.contentItems.length === 0) {
        this.getContentItems();
      }

      if (data && data.length > 0) {
        this.contentItems.forEach((x) => {
          if (x.item.getAttribute('id') === data) {
            this.renderer.setStyle(
              this.navMenuContent,
              'scroll-behavior',
              'smooth'
            );
            this.navMenuContent.scroll(
              0,
              this.scrollLevel === 'page' ? x.offset + 16 : x.offset - 64
            );
            this.renderer.removeStyle(this.navMenuContent, 'scroll-behavior');
          }
        });
      }
    });

    this.highLightNavMenuService.$viewChangeDetector.subscribe((data) => {
      if (data) {
        this.getContentItems();
      }
    });
  }

  ngAfterViewInit(): void {
    this.getContentItems();
  }

  private getContentItems() {
    this.contentItems = new Array<ContentItem>();

    this.elementRef.nativeElement
      .querySelectorAll('.high-light-nav-menu-content')
      .forEach((element) => {
        const item = {
          item: element,
          offset: element.offsetTop,
        };
        this.contentItems.push(item);
      });
  }
}
