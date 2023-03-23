import {
  AfterViewInit,
  Component, ElementRef, OnDestroy,
  OnInit,
  QueryList, Renderer2, ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';
import { FuseSidebarService } from '../../../components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '../../../directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { LayoutService } from '../../vertical/layout-1/layout-1.service';
import { DrawerContentDirective } from './drawer-content.directive';
import { DrawerService } from './drawer.service';

const KEYCODE = {
  ESC: 27,
};

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent implements OnInit, AfterViewInit, OnDestroy {
  sidebarFolded: boolean;
  drawerTitle: string;
  componentSelector: string;
  drawerSize: string;
  isFormValid: BehaviorSubject<boolean>;

  @ViewChildren(FusePerfectScrollbarDirective)
  private _fusePerfectScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

  @ViewChild(DrawerContentDirective, { static: false })
  refHost: DrawerContentDirective;
  // Private
  private _drawerViewScrollbar: FusePerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(
    private _drawerService: DrawerService,
    public _layoutService: LayoutService,
    private _fuseSidebarService: FuseSidebarService,
    private renderer: Renderer2,
    private el: ElementRef,
    private _confirmDialogService: ConfirmDialogService,
    public sanitizer: DomSanitizer
  ) {
    // Set the defaults
    this.isFormValid = _layoutService.isFormValid$;
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the foldedChanged observable
    this._fuseSidebarService
      .getSidebar('drawer')
      .foldedChanged.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((folded) => {
        this.sidebarFolded = folded;
      });

    this._layoutService.drawerTitle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        this.drawerTitle = response;
      });

    this._layoutService.drawerSize
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        if (!!response) {
          if (!!this.drawerSize)
            this.renderer.removeClass(this.el.nativeElement, this.drawerSize);
          this.drawerSize = response;
          this.renderer.addClass(this.el.nativeElement, response);
        }
      });
  }

  onRecordSave() {
    this._layoutService.isFormValid$.next(false);
    this._layoutService.showPrimaryActionSpinner$.next(true);
    this._drawerService.onPrimaryAction();
    this._layoutService.zhealthcareCloseDrawerAction$.next('foldSidebar');
  }

  onRecordDelete() {
    this._drawerService.onSecondaryAction();
    this._layoutService.zhealthcareCloseDrawerAction$.next('foldSidebar');
  }
  /**
   * After view init
   */
  ngAfterViewInit(): void {
    this._drawerViewScrollbar = this._fusePerfectScrollbarDirectives.find(
      (directive) => {
        return directive.elementRef.nativeElement.id === 'messages';
      }
    );
    this._layoutService.referenceHost = this.refHost;
    // ComponentUtils.referenceHost = this.refHost;
  }

  tooltipOptions = {
    contentType: 'string',
    placement: 'bottom',
    trigger: 'hover',
    theme: 'light',
    pointerEvents: 'auto'
  };

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem.offsetHeight < elem.scrollHeight;
    } else {
      return false;
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Fold the temporarily unfolded sidebar back
   */
  foldSidebarTemporarily(): void {
    this._layoutService.foldSidebarTemporarily();
  }

  checkCloseDrawer(e) {
    if (e.keyCode === KEYCODE.ESC) {
      this.foldSidebarTemporarily();
    }
  }

  clearDrawerContentRefHost() {
    this.refHost.viewContainerRef.clear();
  }

  /**
   * Unfold the sidebar temporarily
   */
  unfoldSidebarTemporarily(): void {
    this._fuseSidebarService.getSidebar('drawer').close();
  }

  /**
   * Toggle sidebar opened status
   */
  toggleSidebarOpen(): void {
    this._fuseSidebarService.getSidebar('drawer').toggleOpen();
  }
}
