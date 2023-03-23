import {
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  Directive,
} from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Directive()
export class GoToColumnComponent implements OnDestroy {
  //#region [VARIABLES]

  @ViewChild('auto_scroll_grid') public auto_scroll_grid: any;
  public goToColumnLoading = new BehaviorSubject<boolean>(false);
  public goToColumnLoading$ = this.goToColumnLoading.asObservable();

  //#endregion

  constructor(public renderer: Renderer2) {}

  public scrollToColumn(columnId: string, stickyColumnWidth?: number) {
    stickyColumnWidth =
      stickyColumnWidth && stickyColumnWidth != 0 ? stickyColumnWidth : 0;
    if (columnId && columnId != null && columnId.length > 0) {
      let nativeElement: Element;

      if (this.auto_scroll_grid?.elementRef && this.auto_scroll_grid?.elementRef !== null) {
          nativeElement = this.auto_scroll_grid?.elementRef.nativeElement;
      }

      else if (this.auto_scroll_grid?.nativeElement && this.auto_scroll_grid?.nativeElement !== null) {
          nativeElement = this.auto_scroll_grid?.nativeElement;
      }

      if (nativeElement && nativeElement != null) {
        const current_Column: Element = nativeElement?.querySelector(
          "[id*='" + columnId.toLocaleLowerCase().trim() + "']"
        );

        if (current_Column && current_Column != null) {
          var rect = current_Column.getBoundingClientRect();
          this.goToColumnLoading.next(true);

          if (nativeElement.scrollLeft != 0) {
            nativeElement.scrollLeft = 0;
            interval(1000)
              .pipe(takeWhile(() => this.goToColumnLoading.value))
              .subscribe(() => {
                this.scrollToColumn(columnId, stickyColumnWidth);
              });
          } else {
            this.renderer.addClass(current_Column, 'scroll-smooth');
            nativeElement?.scroll(rect.left - stickyColumnWidth, 0);
            this.goToColumnLoading.next(false);
            this.renderer.removeClass(current_Column, 'scroll-smooth');
            this.renderer.addClass(current_Column, 'highlight-header');
            setTimeout(() => {
              this.renderer.removeClass(current_Column, 'highlight-header');
            }, 3000);
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.auto_scroll_grid = null;
    this.goToColumnLoading.next(false);
  }
}
