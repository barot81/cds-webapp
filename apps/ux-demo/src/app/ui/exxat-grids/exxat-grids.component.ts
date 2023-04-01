import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from '@exxat/ux';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ryzen-exxat-grids',
  templateUrl: './exxat-grids.component.html',
  styleUrls: ['./exxat-grids.component.scss'],
})
export class ExxatGridsComponent {
  @ViewChild('mainHeader') mainHeader: ElementRef;
  @ViewChild('pagination') pagination: ElementRef;

  /**
   *
   */
  constructor(public _scrollService: ScrollService, private _router: Router) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setHeaderHeights();
      });
  }

  private setHeaderHeights() {
    setTimeout(() => {
      if (
        this.mainHeader &&
        this.mainHeader !== null &&
        this.pagination &&
        this.pagination !== null
      ) {
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
