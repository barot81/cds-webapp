import {
  AfterViewInit,
  Component,
  HostListener, OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusionConfigService } from '@zhealthcare/fusion/core';
import { slideInBottom, slideOutBottom } from '../../../animations';
import { ThemeSelectionService } from '../../../components';
import { ScrollService } from '../../../services';
import { DrawerService } from '../../components/drawer/drawer.service';
import { HeaderService } from '../../components/header/header.service';
import { ManifoldPanelDirective } from '../../components/manifold-panel/manifold-panel.directive';
import { LayoutService } from './layout-1.service';

@Component({
  selector: 'vertical-layout-1',
  templateUrl: './layout-1.component.html',
  styleUrls: ['./layout-1.component.scss'],
  animations: [slideInBottom, slideOutBottom],
  encapsulation: ViewEncapsulation.None,
})
export class VerticalLayout1Component
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(ManifoldPanelDirective, { static: false })
  manifoldPanelRefHost: ManifoldPanelDirective;

  fusionConfig: any;
  navigation: any;

  // Private
  private _unsubscribeAll: Subject<any>;
  drawerSize: string;

  constructor(
    public _themeSelection: ThemeSelectionService,
    private _fusionConfigService: FusionConfigService,
    private _drawerService: DrawerService,
    private renderer: Renderer2,
    public _layoutService: LayoutService,
    private headerService: HeaderService,
    private readonly _scrollService: ScrollService
  ) {
    // Set the defaults
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._fusionConfigService.uiSettings
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fusionConfig = config;
      });
    this._drawerService.drawerSize
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        const a = this.renderer;
        this.drawerSize = response;
      });
  }

  onBackDropClick() {
    this._layoutService.foldSidebarTemporarily();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event && event !== null && event.target && event.target !== null) {
      this.headerService.setWindowHeight(event.target.innerHeight);
      this._scrollService.setWindowHeight(event.target.innerHeight);
    }
  }

  ngAfterViewInit(): void {
    this._layoutService.manifoldPanelComponentRef = this.manifoldPanelRefHost;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
