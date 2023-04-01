import { Component } from '@angular/core';
import { FusionFormComponent, FusionFormAdapter } from '@exxat/fusion/components';

@Component({
  selector: 'ryzen-drawer-with-cards',
  templateUrl: './drawer-with-cards.component.html',
})
export class DrawerWithCardsComponent implements FusionFormAdapter {
  constructor() {}

  primaryAction() {}
  secondaryAction() {}
  panelClose() {}
}
