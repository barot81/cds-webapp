import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { ManifoldPanelService } from '../../layout/components/manifold-panel/manifold-panel.service';
import { ManifoldPanel } from '../../layout/components/manifold-panel/manifold-panel';

@Directive({ selector: '[exxatManifoldPanelAction]' })
export class ExxatManifoldPanelActionDirective {
  @Input() componentSelector: string = null;
  @Input() moduleId: string = null;
  @Input() caption: string = null;
  @Input() size: string = null;
  @Input() data: any = null;
  @Input() entityKey: any = null;
  @Input() primaryAction: string = null;
  @Input() secondaryAction: string = null;
  @Input() closeOnNavigation: boolean = true;

  constructor(
    private _manifoldPanelService: ManifoldPanelService,
    private element: ElementRef
  ) {}

  @HostListener('click', ['$event.target']) onClick() {
    this._manifoldPanelService.setManifoldPanelInputs(
      new ManifoldPanel(
        this.componentSelector,
        this.moduleId,
        this.caption,
        this.size,
        this.data,
        this.entityKey,
        this.primaryAction,
        this.secondaryAction,
        this.closeOnNavigation
      ),
      this.element
    );
    this._manifoldPanelService.openPanel(this.componentSelector);
  }
}
