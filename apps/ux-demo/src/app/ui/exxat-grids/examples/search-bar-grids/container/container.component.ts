import { Component, ElementRef, ViewChild } from '@angular/core';
import { FullScreenService, ScrollService } from '@exxat/ux';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'exxat-container',
  templateUrl: './container.component.html',
})
export class SearchBarGridsContainerComponenent {
  @ViewChild('mainHeader') mainHeader: ElementRef;

  constructor(
    public readonly _scrollService: ScrollService,
    private _router: Router,
    public _fullScreen: FullScreenService
  ) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async () => {
        await this.setMainHeaderHeight();
      });
  }
  private async setMainHeaderHeight() {
    setTimeout(async () => {
      if (this.mainHeader && this.mainHeader !== null) {
        //Reser Main Header Height
        await this._scrollService.resetMainHeaderHeight();
        // Set New Height to The Main Header
        await this._scrollService.setMainHeaderHeight(
          this.mainHeader.nativeElement.offsetHeight
        );
      }
    });
  }
}
