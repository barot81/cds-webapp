/* eslint-disable @angular-eslint/component-selector */
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FusionConfigService } from '@zhealthcare/fusion/core';
import { FusionNavigationService } from '@zhealthcare/fusion/services';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '../../../../components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '../../../../directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

@Component({
  selector: 'navbar-vertical-style-2',
  templateUrl: './style-2.component.html',
  styleUrls: ['./style-2.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarVerticalStyle2Component
  implements OnInit, AfterViewInit, OnDestroy
{
  fuseConfig: any;
  navigation: any;

  zhealthcare_prism_logo_path = '/asset/zhealthcare_prism_logo.svg';

  _logoUrl = new BehaviorSubject<string>(
    this._fusionConfigService.get('blobStorage')?.fusionURI +
      this.zhealthcare_prism_logo_path
  );
  _logoUrl$ = this._logoUrl.asObservable();

  // Private
  private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   */
  constructor(
    private _fusionConfigService: FusionConfigService,
    public _fuseNavigationService: FusionNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _router: Router
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngAfterViewInit(): void {
    this._fuseNavigationService._orgLogoPath$.subscribe((path) => {
      this._logoUrl.next('');
      if (path && path !== null && path.length > 0) {
        this._logoUrl.next(path);
      } else {
        this._logoUrl.next(
          this._fusionConfigService.get('blobStorage')?.fusionURI +
            this.zhealthcare_prism_logo_path
        );
      }
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Directive
  @ViewChild(FusePerfectScrollbarDirective, { static: true })
  set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this._fusePerfectScrollbar = theDirective;

    // Update the scrollbar on collapsable item toggle
    this._fuseNavigationService.onItemCollapseToggled
      .pipe(delay(500), takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._fusePerfectScrollbar.update();
      });

    // Scroll to the active item position
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        setTimeout(() => {
          this._fusePerfectScrollbar.scrollToElement(
            'navbar .nav-link.active',
            -120
          );
        });
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        if (this._fuseSidebarService.getSidebar('navbar')) {
          this._fuseSidebarService.getSidebar('navbar').close();
        }
      });

    // Get current navigation
    this._fuseNavigationService.onNavigationChanged
      .pipe(
        filter((value) => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.navigation = this._fuseNavigationService.getCurrentNavigation();
      });

    // Subscribe to the config changes
    this._fusionConfigService.uiSettings
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
      });
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
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar opened status
   */
  toggleSidebarOpened(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleOpen();
  }

  /**
   * Toggle sidebar folded status
   */
  toggleSidebarFolded(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleFold();
  }
}
