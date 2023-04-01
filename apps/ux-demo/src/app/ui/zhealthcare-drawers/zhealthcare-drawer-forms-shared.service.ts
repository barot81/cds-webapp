import { Injectable } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { zhealthcareDrawerReactiveFormComponent } from './examples/zhealthcare-drawer-reactive-form/zhealthcare-drawer-reactive-form.component';
import { DrawerColumnsComponent } from './examples/zhealthcare-two-column-drawer/drawer-columns/drawer-columns.component';
import { FormControlsComponent } from '../form-controls/form-controls.component';
import { DrawerFilterExampleOneComponent } from './examples/drawer-filters-demo/drawers/drawer-filter-example-one/drawer-filter-example-one.component';
import { DrawerWithCardsComponent } from './examples/drawer-with-cards-container/drawer/drawer-with-cards/drawer-with-cards.component';
import { zhealthcareMultiDrawerComponent } from './examples/zhealthcare-multi-drawer/zhealthcare-multi-drawer.component';
import { DrawerWithStickyButtonsComponent } from './examples/drawer-with-sticky-buttons/drawer-with-sticky-buttons.component';
import { zhealthcareDrawerDisableFormComponent } from './examples/zhealthcare-drawer-disable-form/zhealthcare-drawer-disable-form.component';
import { zhealthcareDrawerWithHighlightMenuComponent } from './examples/zhealthcare-drawer-with-highlight-menu/zhealthcare-drawer-with-highlight-menu.component';
import { drawerWithWizardComponent } from './examples/drawer-with-wizard/drawer-with-wizard.component';

@Injectable({providedIn: 'any'})
export class zhealthcareDrawerFormService extends ComponentMap {
  constructor() {
    super();
    this.add('zhealthcare-drawer-reactive-form', zhealthcareDrawerReactiveFormComponent),
      this.add('zhealthcare-drawer-disable-form', zhealthcareDrawerDisableFormComponent),
      this.add('ryzen-drawer-columns', DrawerColumnsComponent);
    this.add('ryzen-form-controls', FormControlsComponent);
    this.add(
      'ryzen-drawer-filter-example-one',
      DrawerFilterExampleOneComponent
    ),
      this.add('ryzen-drawer-with-cards', DrawerWithCardsComponent),
      this.add('zhealthcare-multi-drawer', zhealthcareMultiDrawerComponent),
      this.add(
        'zhealthcare-drawer-with-sticky-buttons',
        DrawerWithStickyButtonsComponent
      ),
      this.add(
        'zhealthcare-drawer-with-highlight-menu',
        zhealthcareDrawerWithHighlightMenuComponent
      ),
      this.add(
        'drawer-with-wizard',
        drawerWithWizardComponent
      );
  }
}
