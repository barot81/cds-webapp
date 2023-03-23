import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FuseMatchMediaService } from './match-media.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

const mainAppHeaderHeight = 48;
@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  //#region [PRIVATE VARIABLES]
  private windowHeight = new BehaviorSubject<number>(window.innerHeight);

  private mainHeaderHeight = new BehaviorSubject<number>(0);
  private contentHeaderHeight = new BehaviorSubject<number>(0);
  private sideBarHeaderHeight = new BehaviorSubject<number>(0);

  private constHeight = mainAppHeaderHeight + 32;

  private pageLayoutContentHeight = this.windowHeight.value - this.constHeight;
  //#endregion

  //#region [PUBLIC VARIABLES]
  private _contentHeight = new BehaviorSubject<number>(0);
  public contentHeight$ = this._contentHeight.asObservable();

  private _sidebarContentHeight = new BehaviorSubject<number>(0);
  public sidebarContentHeight$ = this._sidebarContentHeight.asObservable();
  //#endregion

  /**
   *
   */
  constructor(
    private readonly _fuseMatchMediaService: FuseMatchMediaService,
    private _router: Router
  ) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(async () => {
        await this.resetMainHeaderHeight();
        await this.resetContentHeaderHeight();
        await this.resetSidebarHeaderHeight();
      });

    this._fuseMatchMediaService.onMediaChange.subscribe((media) => {
      if (media && media !== null && media.length > 0) {
        if (media !== 'xs') {
          this.constHeight = mainAppHeaderHeight + 32; // For Bigger(Laptop & Tablet) Screen
        } else {
          this.constHeight = mainAppHeaderHeight + 16; // For Smaller (Mobile) Screen
        }
      }
      this.pageLayoutContentHeight = this.windowHeight.value - this.constHeight;
      this.setContentHeight();
      this.setSidebarContentHeight();
    });
  }

  //#region  [GET METHODS]

  public get contentHeight(): number {
    return this._contentHeight.value;
  }

  public get sidebarContentHeight(): number {
    return this._sidebarContentHeight.value;
  }

  public getMainHeaderHeight(): number {
    return this.mainHeaderHeight.value;
  }

  public getContentHeaderHeight(): number {
    return this.contentHeaderHeight.value;
  }

  public getSidebarHeaderHeight(): number {
    return this.sideBarHeaderHeight.value;
  }

  public getPageLayoutContentHeight(): number {
    return this.pageLayoutContentHeight;
  }
  //#endregion

  //#region [SET/RESET METHODS]
  public async setWindowHeight(height) {
    if (height && height !== null) {
      await this.windowHeight.next(height);
      await this.setContentHeight();
      await this.setSidebarContentHeight();
    }
  }

  public async setMainHeaderHeight(height: number) {
    if (height && height !== null) {
      await this.mainHeaderHeight.next(height);
      await this.setContentHeight();
      await this.setSidebarContentHeight();
    }
  }

  public async setContentHeaderHeight(height: number) {
    if (height && height !== null) {
      await this.contentHeaderHeight.next(height);
      await this.setContentHeight();
    }
  }

  public async setSidebarHeaderHeight(height: number) {
    if (height && height !== null) {
      await this.sideBarHeaderHeight.next(height);
      await this.setSidebarContentHeight();
    }
  }

  public async resetMainHeaderHeight() {
    await this.mainHeaderHeight.next(0);
    await this.setContentHeight();
    await this.setSidebarContentHeight();
  }

  public async resetContentHeaderHeight() {
    await this.contentHeaderHeight.next(0);
    await this.setContentHeight();
  }

  public async resetSidebarHeaderHeight() {
    await this.sideBarHeaderHeight.next(0);
    await this.setSidebarContentHeight();
  }

  private async setContentHeight() {
    this._contentHeight.next(
      this.windowHeight.value -
        (this.getMainHeaderHeight() +
          this.getContentHeaderHeight() +
          this.constHeight)
    );
  }

  private async setSidebarContentHeight() {
    this._sidebarContentHeight.next(
      this.windowHeight.value -
        (this.getMainHeaderHeight() +
          this.getSidebarHeaderHeight() +
          this.constHeight)
    );
  }
  //#endregion
}
