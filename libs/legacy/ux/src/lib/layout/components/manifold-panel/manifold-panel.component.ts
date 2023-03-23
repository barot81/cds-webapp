import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusionConfigService } from '@exxat/fusion/core';

import { FuseSidebarService } from '../../../components/sidebar/sidebar.service';
import { LayoutService } from '../../vertical/layout-1/layout-1.service';
import { ManifoldPanelService } from './manifold-panel.service';
import { ManifoldPanelContentDirective } from './manifold-panel-content.directive';
import { ManifoldPanel } from './manifold-panel';
import { DrawerFocusHelper } from '../../../services/drawer-focus.helper';

@Component({
  selector: 'manifold-panel',
  templateUrl: './manifold-panel.component.html',
  styleUrls: ['./manifold-panel.component.scss'],
})
export class ManifoldPanelComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(ManifoldPanelContentDirective, { static: false })
  manifoldPanelContentRefHost: ManifoldPanelContentDirective;
  @ViewChild('manifoldPanel') manifoldPanel: ElementRef;
  @ViewChild('primaryAction', { static: false }) primaryAction: ElementRef;
  @ViewChild('sidebar', { static: false }) sidebar: ElementRef;
  @ViewChild('manifoldPanelTitle', { static: false })
  manifoldPanelTitle: ElementRef;

  _manifoldPanelCaption = new BehaviorSubject<string>('');
  _manifoldPanelCaption$ = this._manifoldPanelCaption.asObservable();

  tooltipOptions = {
    contentType: 'string',
    placement: 'bottom',
    trigger: 'hover',
    theme: 'light',
    pointerEvents: 'auto'
  };

  private _unsubscribeAll: Subject<any>;
  fusionConfig: any;
  panelName: string;
  activeManifoldPanel: ManifoldPanel;
  focusBtnClassName: string;

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _fusionConfigService: FusionConfigService,
    private _manifoldPanelService: ManifoldPanelService,
    public _layoutService: LayoutService,
    private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef
  ) {
    this._unsubscribeAll = new Subject();
    //#region [accesibility]
    this.focusBtnClassName =
      this._fuseSidebarService.manifoldPanelFocusActiveElement.get(
        this._fuseSidebarService.manifoldPanelInstances
      ).focusedBtnClass;
    //#endregion
  }

  ngOnInit() {
    this.manifoldPanelSettings();
    this._fusionConfigService.uiSettings
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fusionConfig = config;
      });
  }

  async ngAfterViewInit(): Promise<void> {
    this.activeManifoldPanel = this._layoutService.manifoldPanelMap?.get(
      this._layoutService.manifoldPanelInstances
    );
    this._layoutService.manifoldPanelMap.get(
      this._layoutService.manifoldPanelInstances
    ).componentRefHost = this.manifoldPanelContentRefHost;
    this._changeDetectorRef.detectChanges();
    this.applyTemplateStyles();
    this._fuseSidebarService.getSidebar(this.panelName).open();
    await this.createContentComponent();
    this._changeDetectorRef.detectChanges();
  }

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem.offsetHeight < elem.scrollHeight;
    } else {
      return false;
    }
  }

  async createContentComponent() {
    if (this._layoutService.componentType != null)
      await this._manifoldPanelService.createComponent(
        this._layoutService.componentType,
        this.manifoldPanelContentRefHost,
        true
      );
  }

  manifoldPanelSettings() {
    this.panelName = 'manifoldPanel_'.concat(
      this._layoutService.manifoldPanelInstances.toString()
    );
  }

  unfoldPanel() {
    if (
      this._layoutService.manifoldPanelMap.get(
        this._layoutService.manifoldPanelInstances
      )?.closeOnNavigation
    ) {
      if (this._layoutService.manifoldPanelInstances === 1) {
        this.clearManifoldPanelInstances();
      } else {
        this._renderer.removeChild(
          this._elementRef.nativeElement,
          this.manifoldPanel.nativeElement
        );
        this._manifoldPanelService.closePanel(this.panelName);
      }
    } else {
      this._manifoldPanelService.onPanelClose();
    }
  }

  onRecordSave() {
    this._manifoldPanelService.onPrimaryAction();
    this._layoutService.exxatCloseDrawerAction$.next('foldSidebar');
  }

  onRecordDelete() {
    this._manifoldPanelService.onSecondaryAction();
    this._layoutService.exxatCloseDrawerAction$.next('foldSidebar');
  }

  onBackDropClick() {
    this.unfoldPanel();
  }

  clearManifoldPanelInstances() {
    this._manifoldPanelService.closeAllManifoldPanels();
    this._layoutService.exxatCloseDrawerAction$.next('foldSidebar');
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
    DrawerFocusHelper.shiftBackFocusFromDrawer(this._fuseSidebarService);
  }

  setActiveManifoldPanelInputs() {
    const activeManifoldPanel = this._layoutService.manifoldPanelMap?.get(
      this._layoutService.manifoldPanelInstances
    );
    if (!!this.primaryAction) {
      this.activeManifoldPanel.primaryActionTemplate =
        this.primaryAction['_elementRef'].nativeElement;
    }
    if (!!this.sidebar) {
      activeManifoldPanel.sideBar = this.sidebar['_elementRef']?.nativeElement;
      this._renderer.addClass(
        this.sidebar['_elementRef']?.nativeElement,
        this.activeManifoldPanel?.size
      );
    }
    if (!!this.manifoldPanelTitle) {
      this._renderer.setProperty(
        this.manifoldPanelTitle?.nativeElement,
        'innerHTML',
        this.activeManifoldPanel?.caption
      );
      this._manifoldPanelCaption.next(this.activeManifoldPanel?.caption);
    }
  }

  applyTemplateStyles() {
    this.setActiveManifoldPanelInputs();
    if (
      !!this._layoutService.componentType &&
      this._layoutService.manifoldPanelInstances > 1
    ) {
      this._renderer.setStyle(
        this._layoutService.manifoldPanelMap?.get(
          this._layoutService.manifoldPanelInstances - 1
        )?.sideBar,
        'z-index',
        1
      );
      this._renderer.removeClass(
        this._layoutService.manifoldPanelMap?.get(
          this._layoutService.manifoldPanelInstances - 1
        )?.sideBar,
        this._layoutService.manifoldPanelMap?.get(
          this._layoutService.manifoldPanelInstances - 1
        )?.size
      );
      this._renderer.addClass(
        this._layoutService.manifoldPanelMap?.get(
          this._layoutService.manifoldPanelInstances - 1
        )?.sideBar,
        'drawer-xx-lg'
      );
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}