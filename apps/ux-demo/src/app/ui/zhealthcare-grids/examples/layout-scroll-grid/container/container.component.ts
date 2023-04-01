import { Component, ElementRef, ViewChild } from '@angular/core';
import { FullScreenService, ScrollService } from '@zhealthcare/ux';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LayoutScrollService } from '../services';

@Component({
  selector: 'zhealthcare-container',
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  @ViewChild('mainHeader') mainHeader: ElementRef;
  @ViewChild('contentHeader') contentHeader: ElementRef;

  private currentURL = '/admin/ux/ui/zhealthcare-layout-scroll';

  _unsubscribeAll = new Subject();
  /**
   *
   */
  constructor(
    private readonly _scrollService: ScrollService,
    private _router: Router,
    private readonly _layoutScrollService: LayoutScrollService,
    public readonly _fullScreenService: FullScreenService
  ) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event$) => {
        if (this.currentURL === event$['url']) {
          await this.setHeadersHeight();
        }
      });
  }

  private async setHeadersHeight() {
    setTimeout(async () => {
      if (
        this.mainHeader &&
        this.mainHeader !== null &&
        this.contentHeader &&
        this.contentHeader !== null
      ) {
        // Reset Header Height
        await this._scrollService.resetMainHeaderHeight();
        await this._scrollService.resetContentHeaderHeight();

        await this._scrollService.setMainHeaderHeight(
          this.mainHeader.nativeElement.offsetHeight
        );

        // Local Service To Handle The Full Screen Mode
        this._layoutScrollService.mainHeaderHeight =
          this.mainHeader.nativeElement.offsetHeight;

        await this._scrollService.setContentHeaderHeight(
          this.contentHeader.nativeElement.offsetHeight
        );

        // Local Service To Handle The Full Screen Mode
        this._layoutScrollService.contentHeaderOneHeight =
          this.contentHeader.nativeElement.offsetHeight;
      }
    });
  }
}
