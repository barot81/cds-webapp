import {
  ComponentFactoryResolver,
  ElementRef,
  Injectable,
  RendererFactory2,
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  FusionFormAdapter,
  FusionFormComponent,
} from '@zhealthcare/fusion/components';

import { LocationStrategy } from '@angular/common';
import { FuseProgressBarService } from '../../../components/progress-bar/progress-bar.service';
import { FuseSidebarService } from '../../../components/sidebar/sidebar.service';
import { LayoutService } from '../../vertical/layout-1/layout-1.service';
import { FocusElementInfo } from './focus-element-info';
import { ManifoldPanel } from './manifold-panel';
import { ManifoldPanelComponent } from './manifold-panel.component';

@Injectable({ providedIn: 'any' })
export class ManifoldPanelService {
  componentRef: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _layoutService: LayoutService,
    private _fuseSidebarService: FuseSidebarService,
    private _rendererFactory: RendererFactory2,
    private _location: LocationStrategy,
    private _fuseProgressBarService: FuseProgressBarService
  ) {
    this._unsubscribeAll = new Subject();

    this._location.onPopState(async () => {
      // Close Opened Multipanel On Browser Back Button Event
      if (
        this._layoutService.manifoldPanelCompRef &&
        this._layoutService.manifoldPanelCompRef != null &&
        this._fuseSidebarService.getSidebar(
          `manifoldPanel_${this._layoutService.manifoldPanelInstances.toString()}`
        ) &&
        this._fuseSidebarService.getSidebar(
          `manifoldPanel_${this._layoutService.manifoldPanelInstances.toString()}`
        ).opened
      ) {
        this.closeAllManifoldPanels();
      }
    });
  }

  async openPanel(componentType: any) {
    const panelExistsInRegistry = this._fuseSidebarService.getSidebar(
      'manifoldPanel_'.concat(
        this._layoutService.manifoldPanelInstances.toString()
      )
    );
    if (panelExistsInRegistry == null) {
      this.createComponent(
        ManifoldPanelComponent,
        this._layoutService.manifoldPanelComponentRef
      );
      this._layoutService.componentType = componentType;
    } else {
      this._fuseSidebarService
        .getSidebar(
          'manifoldPanel_'.concat(
            this._layoutService.manifoldPanelInstances.toString()
          )
        )
        .open();
      await this.createComponent(
        componentType,
        this._layoutService.manifoldPanelMap.get(
          this._layoutService.manifoldPanelInstances
        ),
        true
      );
      this.instantiateFusionForm();
    }
  }

  async createComponent(
    componentType: any,
    referenceHost: any,
    contentComponent?: boolean
  ) {
    const componentFactory =
      this._componentFactoryResolver.resolveComponentFactory(componentType);
    const compRef = await referenceHost.viewContainerRef.createComponent(
      componentFactory
    );
    compRef.instance.data = this._layoutService.manifoldPanelMap.get(
      this._layoutService.manifoldPanelInstances
    )?.data;
    compRef.instance.key = this._layoutService.manifoldPanelMap.get(
      this._layoutService.manifoldPanelInstances
    )?.entityKey;
    this.componentRef = compRef;
    if (contentComponent != null && contentComponent === true) {
      this._layoutService.manifoldPanelCompRef.set(
        this._layoutService.manifoldPanelInstances,
        compRef
      );
      this.instantiateFusionForm();
    }
  }

  setManifoldPanelInputs(data: ManifoldPanel, focusElement: ElementRef = null) {
    this._layoutService.manifoldPanelInstances += 1;
    this._layoutService.manifoldPanelMap.set(
      this._layoutService.manifoldPanelInstances,
      new ManifoldPanel(
        data.componentSelector,
        data.moduleId,
        data.caption,
        data.size,
        data.data,
        data.entityKey,
        data.primaryAction,
        data.secondaryAction,
        data.closeOnNavigation
      )
    );
    // accessibility focus Element
    const id = this._layoutService.manifoldPanelInstances;
    this._fuseSidebarService.manifoldPanelInstances = id;
    this._fuseSidebarService.manifoldPanelFocusActiveElement.set(
      id,
      new FocusElementInfo(focusElement, 'manifold_btn_' + id, id)
    );
  }

  instantiateFusionForm() {
    (this.componentRef.instance as FusionFormComponent).data =
      this.componentRef.instance.data;
    (this.componentRef.instance as FusionFormComponent).key =
      this.componentRef.instance.key;
    this.manageFusionForm();
  }

  manageFusionForm() {
    if (this.componentRef.instance.fusionFormGroup != null) {
      this._layoutService.manifoldPanelMap.get(
        this._layoutService.manifoldPanelInstances
      ).fusionFormGroup = this.componentRef?.instance?.fusionFormGroup;
      this.manageFusionFormGroupValidity();
    }
  }

  manageFusionFormGroupValidity() {
    const activeManifoldPanel = this._layoutService.manifoldPanelMap.get(
      this._layoutService.manifoldPanelInstances
    );
    if (activeManifoldPanel.primaryActionTemplate) {
      if (
        activeManifoldPanel?.fusionFormGroup?.status.toLowerCase() === 'invalid'
      ) {
        this._rendererFactory
          .createRenderer(null, null)
          .setAttribute(
            activeManifoldPanel?.primaryActionTemplate,
            'disabled',
            'true'
          );
      }
      activeManifoldPanel?.fusionFormGroup?.statusChanges.subscribe(
        (response) => {
          this.managePrimaryActionStyle(response.toLowerCase() === 'invalid');
        }
      );
    }
  }

  onPrimaryAction() {
    this.showActionProgress();
    (
      this._layoutService.manifoldPanelCompRef.get(
        this._layoutService.manifoldPanelInstances
      ).instance as FusionFormAdapter
    ).primaryAction();
  }

  onSecondaryAction() {
    this.showActionProgress();
    (
      this._layoutService.manifoldPanelCompRef.get(
        this._layoutService.manifoldPanelInstances
      ).instance as FusionFormAdapter
    ).secondaryAction();
  }

  onPanelClose() {
    (
      this._layoutService.manifoldPanelCompRef.get(
        this._layoutService.manifoldPanelInstances
      ).instance as FusionFormAdapter
    ).panelClose();
  }

  closePanel(panelName: string) {
    this._fuseSidebarService.getSidebar(panelName)?.close(panelName);
    this._fuseSidebarService.unregister(panelName);
    this.clearContentComponentRefHost();
    this._layoutService.manifoldPanelMap.delete(
      this._layoutService.manifoldPanelInstances
    );
    this._layoutService.manifoldPanelFormMap.delete(
      this._layoutService.manifoldPanelInstances
    );
    this._layoutService.manifoldPanelInstances--;
    this.renderPanelClasses();
    this.hideActionProgress();
  }

  closeCurrentManifoldPanel() {
    if (this._layoutService.manifoldPanelInstances === 1) {
      this.closeAllManifoldPanels();
    } else {
      this.closePanel(
        `manifoldPanel_${this._layoutService.manifoldPanelInstances.toString()}`
      );
      this.hideActionProgress();
    }
  }

  closeAllManifoldPanels() {
    this._layoutService.manifoldPanelInstances = 0;
    this._layoutService.manifoldPanelComponentRef.viewContainerRef.clear();
    this._layoutService.manifoldPanelMap.clear();
    this.hideActionProgress();
  }

  renderPanelClasses() {
    this._rendererFactory
      .createRenderer(null, null)
      .removeClass(
        this._layoutService.manifoldPanelMap?.get(
          this._layoutService.manifoldPanelInstances
        )?.sideBar,
        'drawer-xx-lg'
      );
    this._rendererFactory
      .createRenderer(null, null)
      .addClass(
        this._layoutService.manifoldPanelMap?.get(
          this._layoutService.manifoldPanelInstances
        )?.sideBar,
        this._layoutService.manifoldPanelMap?.get(
          this._layoutService.manifoldPanelInstances
        )?.size
      );
    this._rendererFactory
      .createRenderer(null, null)
      .removeStyle(
        this._layoutService.manifoldPanelMap?.get(
          this._layoutService.manifoldPanelInstances
        )?.sideBar,
        'z-index',
        1
      );
  }

  clearContentComponentRefHost() {
    const componentRefHost = this._layoutService.manifoldPanelMap.get(
      this._layoutService.manifoldPanelInstances
    )?.componentRefHost;
    componentRefHost?.viewContainerRef.clear();
  }

  showActionProgress() {
    this._fuseProgressBarService.show();
  }

  hideActionProgress() {
    this._fuseProgressBarService.hide();
  }

  managePrimaryActionStyle(disable: boolean) {
    const activeManifoldPanel = this._layoutService.manifoldPanelMap?.get(
      this._layoutService.manifoldPanelInstances
    );
    const renderer = this._rendererFactory.createRenderer(null, null);
    if (disable) {
      renderer.setAttribute(
        activeManifoldPanel?.primaryActionTemplate,
        'disabled',
        'true'
      );
      renderer.addClass(
        activeManifoldPanel?.primaryActionTemplate,
        'mat-button-disabled'
      );
    } else {
      renderer.removeAttribute(
        activeManifoldPanel?.primaryActionTemplate,
        'disabled'
      );
      renderer.removeClass(
        activeManifoldPanel?.primaryActionTemplate,
        'mat-button-disabled'
      );
    }
  }
}
