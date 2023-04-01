import { Injectable } from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';
import { ExxatDrawerReactiveFormComponent } from './examples/exxat-drawer-reactive-form/exxat-drawer-reactive-form.component';
import { DrawerColumnsComponent } from './examples/exxat-two-column-drawer/drawer-columns/drawer-columns.component';
import { FormControlsComponent } from '../form-controls/form-controls.component';
import { DrawerFilterExampleOneComponent } from './examples/drawer-filters-demo/drawers/drawer-filter-example-one/drawer-filter-example-one.component';
import { DrawerWithCardsComponent } from './examples/drawer-with-cards-container/drawer/drawer-with-cards/drawer-with-cards.component';
import { ExxatMultiDrawerComponent } from './examples/exxat-multi-drawer/exxat-multi-drawer.component';
import { DrawerWithStickyButtonsComponent } from './examples/drawer-with-sticky-buttons/drawer-with-sticky-buttons.component';
import { ExxatDrawerDisableFormComponent } from './examples/exxat-drawer-disable-form/exxat-drawer-disable-form.component';
import { ExxatDrawerWithHighlightMenuComponent } from './examples/exxat-drawer-with-highlight-menu/exxat-drawer-with-highlight-menu.component';
import { drawerWithWizardComponent } from './examples/drawer-with-wizard/drawer-with-wizard.component';

@Injectable({providedIn: 'any'})
export class ExxatDrawerFormService extends ComponentMap {
  constructor() {
    super();
    this.add('exxat-drawer-reactive-form', ExxatDrawerReactiveFormComponent),
      this.add('exxat-drawer-disable-form', ExxatDrawerDisableFormComponent),
      this.add('ryzen-drawer-columns', DrawerColumnsComponent);
    this.add('ryzen-form-controls', FormControlsComponent);
    this.add(
      'ryzen-drawer-filter-example-one',
      DrawerFilterExampleOneComponent
    ),
      this.add('ryzen-drawer-with-cards', DrawerWithCardsComponent),
      this.add('exxat-multi-drawer', ExxatMultiDrawerComponent),
      this.add(
        'exxat-drawer-with-sticky-buttons',
        DrawerWithStickyButtonsComponent
      ),
      this.add(
        'exxat-drawer-with-highlight-menu',
        ExxatDrawerWithHighlightMenuComponent
      ),
      this.add(
        'drawer-with-wizard',
        drawerWithWizardComponent
      );
  }
}
