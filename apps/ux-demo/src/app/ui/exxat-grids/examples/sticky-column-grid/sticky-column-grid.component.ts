import {
  Component,
  AfterViewInit,
  ElementRef,
  HostListener,
  ViewChild,
  Input,
} from '@angular/core';
import { ScrollService } from '@exxat/ux';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'ryzen-sticky-column-grid',
  templateUrl: './sticky-column-grid.component.html',
  styleUrls: ['./sticky-column-grid.component.scss'],
})
export class StickyColumnGridComponent {
  @ViewChild('mainHeader') mainHeader: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;

  scroll_pointer: number = 0;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    this.scroll_pointer = (event.target as HTMLElement).scrollLeft;
  }

  constructor(public _scrollService: ScrollService, private _router: Router) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async () => {
        await this.setHeaderHeights();
      });
  }

  private async setHeaderHeights() {
    setTimeout(async () => {
      if (
        this.mainHeader &&
        this.mainHeader !== null &&
        this.pagination &&
        this.pagination !== null
      ) {
        // Reset Header Heights
        await this._scrollService.resetMainHeaderHeight();
        await this._scrollService.resetContentHeaderHeight();

        // Set Header Heights
        this._scrollService.setMainHeaderHeight(
          this.mainHeader.nativeElement.offsetHeight
        );
        this._scrollService.setContentHeaderHeight(
          this.pagination.nativeElement.offsetHeight
        );
      }
    });
  }
}
