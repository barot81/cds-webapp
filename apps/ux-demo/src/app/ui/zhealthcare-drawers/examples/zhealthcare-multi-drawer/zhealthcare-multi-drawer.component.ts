import { Component } from '@angular/core';
import { FusionFormComponent, FusionFormAdapter } from '@zhealthcare/fusion/components';
import { zhealthcareDrawerFormService } from '../../zhealthcare-drawer-forms-shared.service';

@Component({
  selector: 'zhealthcare-multi-drawer',
  templateUrl: './zhealthcare-multi-drawer.component.html',
})
export class zhealthcareMultiDrawerComponent implements FusionFormAdapter {
  /**
   *
   */
  constructor(public readonly _drawerService: zhealthcareDrawerFormService) {}

  primaryAction() {}
  secondaryAction() {}
  panelClose() {}
}
