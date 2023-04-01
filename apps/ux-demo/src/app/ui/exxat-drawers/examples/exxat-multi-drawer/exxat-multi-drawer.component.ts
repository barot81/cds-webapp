import { Component } from '@angular/core';
import { FusionFormComponent, FusionFormAdapter } from '@exxat/fusion/components';
import { ExxatDrawerFormService } from '../../exxat-drawer-forms-shared.service';

@Component({
  selector: 'exxat-multi-drawer',
  templateUrl: './exxat-multi-drawer.component.html',
})
export class ExxatMultiDrawerComponent implements FusionFormAdapter {
  /**
   *
   */
  constructor(public readonly _drawerService: ExxatDrawerFormService) {}

  primaryAction() {}
  secondaryAction() {}
  panelClose() {}
}
