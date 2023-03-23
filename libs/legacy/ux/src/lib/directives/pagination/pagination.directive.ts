/* eslint-disable @angular-eslint/directive-selector */
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewInit,
  Directive,
  DoCheck,
  Host,
  Input,
  Optional,
  Renderer2,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FuseMatchMediaService } from '../../services';

@Directive({
  selector: 'mat-paginator',
})
export class PaginationDirective implements DoCheck, AfterViewInit {
  private currentPage: number;
  private pageGapTxt: string[];
  private rangeStart: number;
  private rangeEnd: number;
  private buttons: MatButton[] = [];
  private showTotalPages: number;
  private checkPage: number[];
  private showPageGaps: boolean;
  private previousPageCount: number;

  @Input('isSidebar') isSidebar: boolean = false;

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private readonly ViewContainer: ViewContainerRef,
    private readonly renderer: Renderer2,
    public breakpointObserver: BreakpointObserver,
    public mediaService: FuseMatchMediaService
  ) {
    this.matPag.showFirstLastButtons = true;
    this.currentPage = 1;
    this.pageGapTxt = ['...', '---'];

    this.checkPage = [0, 0, 0];

    // Subscribe to rerender buttons when next page and last page button is used
    this.matPag.page.subscribe((paginator: PageEvent) => {
      this.currentPage = paginator.pageIndex;
      this.matPag.pageIndex = paginator.pageIndex;
      this.initPageRange();
      this.resetScrollPosition();
    });
  }

  private resetScrollPosition(): void {
    const scrollElements = document.getElementsByClassName('overflow-auto');
    const scrollfuseScrollElement = document.querySelectorAll(
      'div[fusePerfectScrollbar]'
    );

    if (
      scrollElements &&
      scrollElements !== null &&
      scrollElements.length > 0
    ) {
      Array.from(scrollElements).forEach((parentElement) => {
        if (
          parentElement &&
          parentElement !== null &&
          parentElement.children &&
          parentElement.children !== null &&
          parentElement.children.length > 0
        ) {
          Array.from(parentElement.children).forEach((element) => {
            if (element && element !== null) {
              if (
                element.classList.contains('mat-table') ||
                element.classList.contains('mat-list')
              ) {
                parentElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'end',
                });
                parentElement.scroll(0, 0);
              }
            }
          });
        }
      });
    }

    if (
      scrollfuseScrollElement &&
      scrollfuseScrollElement !== null &&
      scrollfuseScrollElement.length > 0
    ) {
      Array.from(scrollfuseScrollElement).forEach((parentElement) => {
        if (
          parentElement &&
          parentElement !== null &&
          parentElement.children &&
          parentElement.children !== null &&
          parentElement.children.length > 0
        ) {
          Array.from(parentElement.children).forEach((element) => {
            if (element && element !== null) {
              if (element.classList.contains('mat-list')) {
                parentElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'end',
                });
                parentElement.scroll(0, 0);
              }
            }
          });
        }
      });
    }
  }

  public ngAfterViewInit(): void {
    this.rangeStart = 0;
    this.rangeEnd = this.showTotalPages;
    this.initPageRange();
  }

  ngDoCheck(): void {
    if (this.mediaService.activeMediaQuery == 'xs' || this.isSidebar == true) {
      this.showPageGaps = false;
      this.showTotalPages = 1;
    } else {
      this.showPageGaps = true;
      this.showTotalPages = 2;
    }

    // Reset paginator if the pageSize, pageIndex, length changes
    if (
      this.matPag?.length !== this.checkPage[0] ||
      this.matPag?.pageSize !== this.checkPage[1] ||
      this.matPag?.pageIndex !== this.checkPage[2]
    ) {
      const pageCount = this.matPag.getNumberOfPages();
      if (this.currentPage > pageCount) {
        this.currentPage = 1;
        this.matPag.pageIndex = 0;
      }
      this.currentPage = this.matPag.pageIndex;
      this.initPageRange();
      this.checkPage = [
        this.matPag.length,
        this.matPag.pageSize,
        this.matPag.pageIndex,
      ];
    }
  }

  private buildPageNumbers = () => {
    let dots: boolean[];
    let page: number;
    let pageDifference: number;
    let startIndex: number;
    let totalPages: number;
    totalPages = this.matPag.getNumberOfPages();
    // Container div with paginator elements
    const actionContainer =
      this.ViewContainer.element.nativeElement.querySelector(
        'div.mat-paginator-range-actions'
      );
    // Button that triggers the next page action
    const nextPageNode = this.ViewContainer.element.nativeElement.querySelector(
      'button.mat-paginator-navigation-next'
    );
    // Label showing the page range
    const pageRange = this.ViewContainer.element.nativeElement.querySelector(
      'div.mat-paginator-range-label'
    );

    let prevButtonCount = this.buttons.length;

    // Remove buttons before creating new ones
    if (prevButtonCount > 0) {
      this.buttons.forEach((button) => {
        this.renderer.removeChild(actionContainer, button);
      });
      // Empty state array
      prevButtonCount = 0;
    }

    // Initialize next page and last page buttons
    if (prevButtonCount === 0) {
      const nodeArray = actionContainer.childNodes;
      setTimeout(() => {
        for (const node of nodeArray) {
          if (node.nodeName === 'BUTTON') {
            // Next Button styles
            if (node.innerHTML.length > 100 && node.disabled) {
              this.renderer.addClass(node, 'mat-icon-button');
              this.renderer.addClass(node, 'pagination-next-button');
              this.renderer.setStyle(node, 'margin-left', '2px');
              this.renderer.setStyle(node, 'margin-right', '2px');
            } else if (node.innerHTML.length > 100 && !node.disabled) {
              this.renderer.addClass(node, 'mat-icon-button');
              this.renderer.addClass(node, 'pagination-next-button');
              this.renderer.setStyle(node, 'margin-left', '2px');
              this.renderer.setStyle(node, 'margin-right', '2px');
            }
          }
        }
      });
    }

    dots = [false, false];

    page = this.showTotalPages;
    pageDifference = totalPages - page;
    startIndex = 0;

    if (this.showPageGaps) {
      for (let index = startIndex; index < totalPages; index = index + 1) {
        if (index >= this.rangeStart && index <= this.rangeEnd) {
          this.renderer.insertBefore(
            actionContainer,
            this.createButton(`${index}`, this.matPag.pageIndex),
            nextPageNode
          );
        } else {
          if (index > this.rangeEnd && !dots[0]) {
            this.renderer.insertBefore(
              actionContainer,
              this.createButton(this.pageGapTxt[0], this.matPag.pageIndex),
              nextPageNode
            );
            dots[0] = true;
            break;
          }
          if (index < this.rangeEnd && !dots[1]) {
            this.renderer.insertBefore(
              actionContainer,
              this.createButton(this.pageGapTxt[1], this.matPag.pageIndex),
              nextPageNode
            );
            dots[1] = true;
          }
        }
      }
    }

    if (!this.showPageGaps) {
      for (let index = startIndex; index < totalPages; index = index + 1) {
        if (
          // (index < page - 2 && this.currentPage <= this.showTotalPages) ||
          index >= this.rangeStart &&
          index <= this.rangeEnd
        ) {
          this.renderer.insertBefore(
            actionContainer,
            this.createOneButton(`${index}`, this.matPag.pageIndex),
            nextPageNode
          );
        }
      }
    }
  };

  private createOneButton(index: string, pageIndex: number): MatButton {
    this.showTotalPages = 1;
    const linkBtn: MatButton = this.renderer.createElement('button');
    this.renderer.addClass(linkBtn, 'mat-icon-button');
    this.renderer.addClass(linkBtn, 'pagination-button');
    this.renderer.addClass(linkBtn, 'mat-button-base');
    this.renderer.setStyle(linkBtn, 'margin-left', '2px');
    this.renderer.setStyle(linkBtn, 'margin-right', '2px');

    if (index === this.pageGapTxt[0] || index === this.pageGapTxt[1]) {
      this.renderer.addClass(linkBtn, 'mat-icon-button');
      this.renderer.addClass(linkBtn, 'pagination-button');
      this.renderer.addClass(linkBtn, 'mat-button-base');
      this.renderer.setStyle(linkBtn, 'margin-left', '2px');
      this.renderer.setStyle(linkBtn, 'margin-right', '2px');
    }
    const pagingTxt = isNaN(+index) ? this.pageGapTxt[0] : +index + 1;
    const text = this.renderer.createText(pagingTxt + '');
    this.renderer.addClass(linkBtn, 'mat-custom-page');
    switch (index) {
      case `${pageIndex}`:
        this.renderer.addClass(linkBtn, 'mat-icon-button');
        this.renderer.addClass(linkBtn, 'pagination-button');
        this.renderer.addClass(linkBtn, 'primary');
        this.renderer.addClass(linkBtn, 'active');
        this.renderer.addClass(linkBtn, 'mat-button-base');
        this.renderer.setStyle(linkBtn, 'margin-left', '2px');
        this.renderer.setStyle(linkBtn, 'margin-right', '2px');
        break;
      default:
        this.renderer.listen(linkBtn, 'click', () => {
          this.switchPage(+index);
        });
        break;
    }
    // Add button to private array for state
    this.renderer.appendChild(linkBtn, text);
    this.buttons.push(linkBtn);
    return linkBtn;
  }

  private createButton(index: string, pageIndex: number): MatButton {
    this.showTotalPages = 2;
    const linkBtn: MatButton = this.renderer.createElement('button');
    this.renderer.addClass(linkBtn, 'mat-icon-button');
    this.renderer.addClass(linkBtn, 'pagination-button');
    this.renderer.addClass(linkBtn, 'text-color');
    this.renderer.addClass(linkBtn, 'mat-button-base');
    this.renderer.setStyle(linkBtn, 'margin-left', '2px');
    this.renderer.setStyle(linkBtn, 'margin-right', '2px');

    if (index === this.pageGapTxt[0] || index === this.pageGapTxt[1]) {
      this.renderer.addClass(linkBtn, 'mat-icon-button');
      this.renderer.addClass(linkBtn, 'pagination-button');
      this.renderer.addClass(linkBtn, 'text-color');
      this.renderer.addClass(linkBtn, 'mat-button-base');
      this.renderer.setStyle(linkBtn, 'margin-left', '2px');
      this.renderer.setStyle(linkBtn, 'margin-right', '2px');
    }
    const pagingTxt = isNaN(+index) ? this.pageGapTxt[0] : +index + 1;
    const text = this.renderer.createText(pagingTxt + '');
    this.renderer.addClass(linkBtn, 'mat-custom-page');
    switch (index) {
      case `${pageIndex}`:
        this.renderer.addClass(linkBtn, 'mat-icon-button');
        this.renderer.addClass(linkBtn, 'primary');
        this.renderer.addClass(linkBtn, 'pagination-button');
        this.renderer.addClass(linkBtn, 'active');
        this.renderer.addClass(linkBtn, 'mat-button-base');
        this.renderer.setStyle(linkBtn, 'margin-left', '2px');
        this.renderer.setStyle(linkBtn, 'margin-right', '2px');
        break;
      case this.pageGapTxt[0]:
        this.renderer.listen(linkBtn, 'click', () => {
          this.switchPage(
            this.currentPage + 1 < this.showTotalPages
              ? this.showTotalPages
              : this.currentPage + this.showTotalPages
          );
        });
        break;
      case this.pageGapTxt[1]:
        this.renderer.listen(linkBtn, 'click', () => {
          this.switchPage(
            this.currentPage >
              this.matPag.getNumberOfPages() - this.showTotalPages
              ? this.matPag.getNumberOfPages() - this.showTotalPages - 1
              : this.currentPage - this.showTotalPages
          );
        });
        break;
      default:
        this.renderer.listen(linkBtn, 'click', () => {
          this.switchPage(+index);
        });
        break;
    }
    this.renderer.appendChild(linkBtn, text);
    // Add button to private array for state
    this.buttons.push(linkBtn);
    return linkBtn;
  }

  private initPageRange(): void {
    if (this.showPageGaps) {
      if (this.currentPage == this.matPag.getNumberOfPages() - 1) {
        this.rangeStart = this.currentPage - 1;
        this.rangeEnd = this.currentPage + 1;
      } else {
        this.rangeStart = this.currentPage;
        this.rangeEnd = this.currentPage + 1;
      }
    } else {
      this.rangeStart = this.currentPage - this.showTotalPages / 2;
      this.rangeEnd = this.currentPage + this.showTotalPages / 2;
    }

    this.buildPageNumbers();
  }

  private switchPage(index: number): void {
    this.matPag.pageIndex = index;
    this.matPag.page.emit({
      previousPageIndex: this.currentPage,
      pageIndex: index,
      pageSize: this.matPag.pageSize,
      length: this.matPag.length,
    });
    this.currentPage = index;
    this.initPageRange();
  }
}
